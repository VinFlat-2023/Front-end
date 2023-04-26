import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuillEditor } from '../../../../../components/editor';
import * as Yup from 'yup';

// material
import {
  Box,
  Card,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
// utils
import axios from '../../../../../utils/axios';
// routes
import { PATH_ADMIN, PATH_SUPERVISOR } from '../../../../../routes/paths';
//
import { useDispatch } from 'react-redux';
import { uploadImage } from 'src/utils/firebase';
import UploadSingleFile from '../../../../../components/upload/UploadSingleFile';

// ----------------------------------------------------------------------
const locationFake = [{ id: '1', label: 'HCM' }];

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function CreateRoomForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [imageUpload, setImageUpload] = useState(null);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Tên đang trống'),
    location: Yup.string().required('Vui lòng không bỏ trống'),
    images: Yup.mixed().required('Ảnh đang trống')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      location: '',
      images: null
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const url = await uploadImage(imageUpload);
        setSubmitting(false);
        const createValue = {
          name: values.name,
          location: values.location,
          status: true,
          imageUrl: url,
        };
        try {
          const response = await axios.post('areas', createValue);
          
          resetForm();
          enqueueSnackbar('Thêm phòng thành công', { variant: 'success' });
          navigate(PATH_SUPERVISOR.room.listRoom);
        } catch (error) {
          console.log('error', error);
          setErrors(error.message);
          enqueueSnackbar(error.message, { variant: 'error' });
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
      const file = acceptedFiles[0];
      setImageUpload(file);
      if (file) {
        setFieldValue('images', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
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
                <Stack>
                  <TextField
                    fullWidth
                    label="Tên phòng"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <TextField
                    select
                    fullWidth
                    label="Tên căn hộ"
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
                  <TextField
                    select
                    fullWidth
                    label="Loại phòng"
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
                    <LabelStyle>Hình ảnh phòng</LabelStyle>
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

                

                <Stack>
                  <div>
                    <LabelStyle>Mô tả</LabelStyle>
                    <QuillEditor
                      id="post-content"
                      value={values.description}
                      onChange={(val) => setFieldValue('description', val)}
                      error={Boolean(touched.description && errors.description)}
                    />
                    {touched.description && errors.description && (
                      <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                        {touched.description && errors.description}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Thêm phòng mới
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
