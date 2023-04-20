import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';

// material
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';
// utils
import axios from '../../../../../utils/axios';
// routes
import { PATH_ADMIN } from '../../../../../routes/paths';
//
import UploadMultiFile from '../../../../../components/upload/UploadMultiFile';
import { createNewEmployee, updateUserProfile } from 'src/redux/slices/user';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

// CreateAreaForm.propTypes = {
//   isEdit: PropTypes.bool,
//   currentUser: PropTypes.object
// };
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function CreateAreaForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Tên đang trống'),
    location: Yup.string().required('vị trí đang trống'),
    images: Yup.array().min(1, 'Hình ảnh đang trống') && Yup.array().max(4, 'Quá nhiều ảnh')
  });

  // "username": "A_admin",
  // "fullname": "Admin full role",
  // "email": "admin@vinflat.com",
  // "phone": "0123456789",
  // "address": "TPHCM",
  // "roleId": 1,

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      location: '',
      images: []
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        setSubmitting(false);
        console.log('value area', values);
        const createValue = {
          name: values.name,
          location: values.location
        };
        try {
          const response = await axios.post('areas', createValue);
          //   const rsImage = await axios.put('', values.images)
          for (let i = 0; i < values.images.length; i++) {
            const rsImage = await axios.put('', values.images);
          }
          resetForm();
          enqueueSnackbar('Thêm khu vực thành công', { variant: 'success' });
          navigate(PATH_ADMIN.area.listAreas);
        } catch (error) {
          console.log('error', error);
          setErrors(error);
          enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
        }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFieldValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleRemove = (file) => {
    const filteredItems = values.images.filter((_file) => _file !== file);
    setFieldValue('images', filteredItems);
  };

  const handleRemoveAll = () => {
    setFieldValue('images', []);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 5 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Tên khu vực"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Vị trí"
                    {...getFieldProps('location')}
                    error={Boolean(touched.location && errors.location)}
                    helperText={touched.location && errors.location}
                  />
                </Stack>

                <Stack>
                  <div>
                    <LabelStyle>Hình ảnh khu vực ( tối đa 4 ảnh )</LabelStyle>
                    <UploadMultiFile
                      showPreview
                      maxSize={5145728}
                      accept="image/*"
                      files={values.images}
                      onDrop={handleDrop}
                      error={Boolean(touched.images && errors.images)}
                      onRemove={handleRemove}
                      onRemoveAll={handleRemoveAll}
                    />
                    {touched.images && errors.images && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.images && errors.images}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Thêm khu vực
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
