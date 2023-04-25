import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
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
//

import { uploadImage } from 'src/utils/firebase';
import UploadSingleFile from '../../../../../components/upload/UploadSingleFile';

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
  const { enqueueSnackbar } = useSnackbar();

  const [imageUpload, setImageUpload] = useState(null);


  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Tên đang trống'),
    location: Yup.string().required('vị trí đang trống'),
    images: Yup.mixed().required('Ảnh đang trống')
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: areaDetail?.Name || '',
      location: areaDetail?.Location || '',
      images: areaDetail?.AreaImageUrl1 || []
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const url = await uploadImage(imageUpload)

      try {
        setSubmitting(false);
        const createValue = {
          name: values?.name,
          location: values?.location,
          status: true,
          imageUrl: url
        };
        try {
          await axios.put(`areas/${areaDetail.AreaId}`, createValue);
          enqueueSnackbar('Chỉnh sửa khu vực thành công', { variant: 'success' });
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
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImageUpload(file);
      if (file) {
        setFieldValue('images', {
          ...file,
          preview: URL.createObjectURL(file),
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
