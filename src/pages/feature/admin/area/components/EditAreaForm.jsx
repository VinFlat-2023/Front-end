import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
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
import UploadSingleFile from '../../../../../components/upload/UploadSingleFile';
import { createNewEmployee, updateUserProfile } from 'src/redux/slices/user';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------
const locationFake = [{ id: '1', label: 'HCM' }];

// ----------------------------------------------------------------------

EditAreaForm.propTypes = {
  areaDetail: PropTypes.object
};
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function EditAreaForm({ areaDetail }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  // const [imageURL, setImageURL] = useState(areaDetail.);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Tên đang trống'),
    location: Yup.string().required('vị trí đang trống'),
    images: Yup.mixed().required('Ảnh đang trống')
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
      name: areaDetail?.Name || '',
      location: areaDetail?.Location || '',
      images: areaDetail?.ImageUrl || []
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        setSubmitting(false);
        const createValue = {
          name: values?.name,
          location: values?.location,
          status: true
        };
        try {
          const response = await axios.put(`areas/${areaDetail.AreaId}`, createValue);
          let imageArr = [];
          imageArr.push(values.images.path);

          const rsImage = await axios.put(`upload/area/${areaDetail.AreaId}`, {
            ImageUploadRequest: imageArr
          });
          resetForm();
          enqueueSnackbar('Chỉnh sửa khu vực thành công', { variant: 'success' });
          navigate(PATH_ADMIN.area.listAreas);
        } catch (error) {
          console.log('error', error);
          setErrors(error.message);
          enqueueSnackbar(error.message, { variant: 'error' });
        }
      } catch (error) {
        setSubmitting(false);
        console.log('error', error);
        setErrors(error.message);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('images', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

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
                    select
                    fullWidth
                    label="Vị trí"
                    {...getFieldProps('location')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.location && errors.location)}
                    helperText={touched.location && errors.location}
                  >
                    <option value="" />
                    {locationFake.map((option) => (
                      <option key={option.id} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Stack>
                  <div>
                    <LabelStyle>Hình ảnh khu vực ( tối đa 1 ảnh )</LabelStyle>
                    <UploadSingleFile
                      maxSize={5145728}
                      accept="image/*"
                      file={values.images}
                      onDrop={handleDrop}
                      error={Boolean(touched.images && errors.images)}
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
                    Chỉnh sửa khu vực
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
