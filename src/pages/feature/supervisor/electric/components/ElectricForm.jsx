import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

// material
import { Box, Card, FormHelperText, Grid, Stack, TextField, Typography, Select, MenuItem } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
// utils
import axios from '../../../../../utils/axios';
// routes
import { PATH_ADMIN } from 'src/routes/paths';
// import UploadSingleFile from '../../../../../components/upload/UploadSingleFile';

// ----------------------------------------------------------------------

export default function ElectricForm({ electricWater, listFlats, onChangeFlat, flats, isDisabled }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    preElectricNumber: Yup.number().required('Số điện đầu đang trống').min(0, 'Số điện đầu phải từ 0 trở lên'),
    preWaterNumber: Yup.number().required('Số nước đầu đang trống').min(0, 'số nước đầu phải từ 0 trở lên'),
    ElectricNumber: Yup.number()
      .required('Số điện cuối đang trống')
      .min(0, 'Số điện đầu phải từ 0 trở lên')
      .test('isLarger', 'Số cuối phải lớn hơn số đầu', (value, testContext) => {
        if (testContext.parent.preElectricNumber > value) return false;
        return true;
      }),
    WaterNumber: Yup.number()
      .required('Số nước đang trống')
      .min(0, 'số nước phải lớn từ 0 trở lên')
      .test('isLarger', 'Số cuối phải lớn hơn số đầu', (value, testContext) => {
        if (testContext.parent.preWaterNumber > value) return false;
        return true;
      }),
    totalWaterNumber: Yup.number().required('Tổng số nước đang trống').min(0, 'Tổng số nước phải từ 0 trở lên'),
    totalElectricNumber: Yup.number().required('Tổng điện nước đang trống').min(0, 'Tổng điện nước phải từ 0 trở lên')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      flat: '',
      building: listFlats[0]?.Building?.BuildingName || '',
      preElectricNumber: electricWater?.ElectricityMeterBefore || 0,
      preWaterNumber: electricWater?.WaterMeterBefore || 0,
      ElectricNumber: electricWater?.ElectricityMeterAfter || 0,
      WaterNumber: electricWater?.WaterMeterAfter || 0,
      totalWaterNumber: electricWater?.UsedWaterNumber || 0,
      totalElectricNumber: electricWater?.UsedElectricityNumber || 0
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        setSubmitting(false);
        const updateValue = {
          waterMeterBefore: values.preWaterNumber,
          waterMeterAfter: values.WaterNumber,
          electricityMeterBefore: values.preElectricNumber,
          electricityMeterAfter: values.ElectricNumber
        };
        try {
          const rs = await axios.put(`metric/current/building/flat/${flats}`, updateValue);
          resetForm();
          enqueueSnackbar(rs.data.message, { variant: 'success' });
          window.location.reload();
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
                    disabled={true}
                    label="Tên ký túc xá"
                    {...getFieldProps('building')}
                    error={Boolean(touched.building && errors.building)}
                    helperText={touched.building && errors.building}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Tên căn hộ"
                    SelectProps={{ native: true }}
                    onChange={onChangeFlat}
                    error={Boolean(touched.flat && errors.flat)}
                    helperText={touched.flat && errors.flat}
                  >
                    <option value="" />
                    {listFlats.map((option) => (
                      <option key={option.FlatId} value={option.FlatId}>
                        {option.Name}
                      </option>
                    ))}
                  </TextField>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled={isDisabled}
                    type="number"
                    label="Số điện đầu"
                    {...getFieldProps('preElectricNumber')}
                    error={Boolean(touched.preElectricNumber && errors.preElectricNumber)}
                    helperText={touched.preElectricNumber && errors.preElectricNumber}
                  />
                  <TextField
                    fullWidth
                    disabled={isDisabled}
                    type="number"
                    label="Số điện cuối"
                    {...getFieldProps('ElectricNumber')}
                    error={Boolean(touched.ElectricNumber && errors.ElectricNumber)}
                    helperText={touched.ElectricNumber && errors.ElectricNumber}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled={isDisabled}
                    type="number"
                    label="Số nước đầu"
                    {...getFieldProps('preWaterNumber')}
                    error={Boolean(touched.preWaterNumber && errors.preWaterNumber)}
                    helperText={touched.preWaterNumber && errors.preWaterNumber}
                  />
                  <TextField
                    fullWidth
                    disabled={isDisabled}
                    type="number"
                    label="Số nước cuối"
                    {...getFieldProps('WaterNumber')}
                    error={Boolean(touched.WaterNumber && errors.WaterNumber)}
                    helperText={touched.WaterNumber && errors.WaterNumber}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled
                    type="number"
                    label="Tổng số điện đã dùng "
                    {...getFieldProps('totalElectricNumber')}
                    error={Boolean(touched.totalElectricNumber && errors.totalElectricNumber)}
                    helperText={touched.totalElectricNumber && errors.totalElectricNumber}
                  />
                  <TextField
                    fullWidth
                    disabled
                    type="number"
                    label="Tổng số nước đã dùng "
                    {...getFieldProps('totalWaterNumber')}
                    error={Boolean(touched.totalWaterNumber && errors.totalWaterNumber)}
                    helperText={touched.totalWaterNumber && errors.totalWaterNumber}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton disabled={isDisabled} type="submit" variant="contained" loading={isSubmitting}>
                    Cập nhật
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
