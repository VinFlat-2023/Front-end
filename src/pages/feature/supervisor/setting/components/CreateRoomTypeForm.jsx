import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import * as Yup from 'yup';

// material
import { Box, Card, Grid, Stack, TextField, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import axios from '../../../../../utils/axios';
// routes
import { PATH_SUPERVISOR } from '../../../../../routes/paths';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: 'green',
  marginBottom: theme.spacing(1)
}));
//----------------------------------------------------------------
export default function CreateRoomTypeForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Tên đang trống'),
    numberOfslot: Yup.number().required('Số giường đang trống') && Yup.number().positive('Must be more than 0'),
    status: Yup.string().required('trạng thái đang trống')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      numberOfslot: 0,
      status: ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        setSubmitting(false);
        const createValue = {
          roomSignName: values.name,
          totalSlot: values.numberOfslot,
          status: values.status
        };
        try {
          const response = await axios.post('building/room', createValue);

          resetForm();
          enqueueSnackbar(response.data.message, { variant: 'success' });
          navigate(PATH_SUPERVISOR.setting.roomType);
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
                <Stack>
                  <TextField
                    fullWidth
                    label="Tên Phòng"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>
                <Stack>
                  <TextField
                    fullWidth
                    type="number"
                    label="Tổng số slot"
                    {...getFieldProps('numberOfslot')}
                    error={Boolean(touched.numberOfslot && errors.numberOfslot)}
                    helperText={touched.numberOfslot && errors.numberOfslot}
                  />
                </Stack>
                <Stack>
                  <TextField
                    select
                    fullWidth
                    label="Trạng thái"
                    {...getFieldProps('status')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.status && errors.status)}
                    helperText={touched.status && errors.status}
                  >
                    <option value=""></option>
                    <option key={1} value="Available">
                      Còn chỗ
                    </option>
                    <option key={2} value="Maintenance">
                      Đang bảo trì
                    </option>
                  </TextField>
                </Stack>
                <Box>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Thêm phòng
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
