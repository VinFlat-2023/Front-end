import { Form, FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import {
  Box,
  Card,
  Container,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField
} from '@material-ui/core';
// redux
import { DateTimePicker, LoadingButton } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import useSettings from 'src/hooks/useSettings';
// components
import { useSnackbar } from 'notistack5';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import { createInvoice } from 'src/redux/slices/finance';
import { PATH_SUPERVISOR } from 'src/routes/paths';
import { useState } from 'react';
import { SwitchAccount } from '@material-ui/icons';
// ----------------------------------------------------------------------

const TYPES = [
  { id: 0, label: "Thu" },
  { id: 1, label: "Chi" },
]

export default function CreateBill() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { currentBill } = useSelector(state => state.finance);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [dueDate, setDueDate] = useState();


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentBill?.Name || '',
      type: currentBill?.InvoiceType?.InvoiceTypeName || '',
      renter: currentBill?.Renter?.FullName || '',
      employee: currentBill?.Employee?.FullName || '',
      createDate: currentBill?.CreatedTimeReturn || '',
      dueDate: dueDate,
      completeDate: currentBill?.PaymentTimeReturn || '',
      status: currentBill?.Status || 'false',
      detail: currentBill?.Detail || '',
    },
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        setSubmitting(false);
        console.log(values);
        dispatch(createInvoice(values, navigate, enqueueSnackbar));
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;


  return (
    <Page title="Thông tin hóa đơn">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Thông tin hóa đơn"
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Quản lý tài chính', href: PATH_SUPERVISOR.finances.root },
            { name: 'Chỉnh sửa tài khoản' }
          ]}
        />

        <Stack spacing={5}>
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Card sx={{ p: 5 }}>
                    <Stack spacing={3}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          fullWidth
                          label="Tên hóa đơn"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                        <TextField
                          fullWidth
                          label="Khách thuê"
                          {...getFieldProps('renter')}
                          error={Boolean(touched.renter && errors.renter)}
                          helperText={touched.renter && errors.renter}
                        />
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          select
                          fullWidth
                          label="Loại hóa đơn"
                          {...getFieldProps('type')}
                          SelectProps={{ native: true }}
                        >
                          <option value="" />
                          {TYPES.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                        <DateTimePicker
                          renderInput={(props) => <TextField {...props} fullWidth />}
                          label="Hạn trả"
                          value={new Date()}
                          onChange={(newValue) => setDueDate(newValue)}
                        />
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>

                        <TextField
                          fullWidth
                          multiline={true}
                          label="Detail"
                          {...getFieldProps('detail')}
                        />
                      </Stack>


                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }} justifyContent='space-between'>


                        <Stack spacing={3}>
                          <FormControlLabel
                            control={<Switch {...getFieldProps('status')} />}
                            label="Đã thanh toán"
                            labelPlacement="start"
                            sx={{ mb: 1, mx: 0, width: '100%', justifyContent: 'space-between' }}
                          />
                        </Stack>

                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                            Tạo hóa đơn
                          </LoadingButton>
                        </Box>
                      </Stack>



                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Stack>
      </Container>
    </Page>
  );
}
