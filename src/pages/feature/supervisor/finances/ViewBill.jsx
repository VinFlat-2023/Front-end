import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// material
import {
  Box,
  Card,
  Container,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';
// redux
import { LoadingButton } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import useSettings from 'src/hooks/useSettings';
// components
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import Scrollbar from 'src/components/Scrollbar';
import { getInvoiceById, updateInvoice } from 'src/redux/slices/finance';
import { PATH_SUPERVISOR } from 'src/routes/paths';
import Label from 'src/components/Label';
import { useSnackbar } from 'notistack5';
// ----------------------------------------------------------------------



export default function ViewBill() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentBill } = useSelector(state => state.finance);
  const [isEdit, setIsEdit] = useState(false);
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const [amount, setAmount] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getInvoiceById(id));
  }, []);

  useEffect(() => {
    setInvoiceDetail(currentBill?.InvoiceDetails);
    setAmount(currentBill?.Amount);
  }, [currentBill]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentBill?.Name || '',
      amount: amount,
      type: currentBill?.InvoiceType?.InvoiceTypeName || '',
      renter: currentBill?.Renter?.FullName || '',
      employee: currentBill?.Employee?.FullName || '',
      createDate: currentBill?.CreatedTimeReturn || '',
      dueDate: currentBill?.DueDateReturn || '',
      completeDate: currentBill?.PaymentTimeReturn || '',
      status: currentBill?.Status || 'false',
      detail: currentBill?.Detail || '',
    },
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        setSubmitting(false);
        if (isEdit) {

          dispatch(updateInvoice(currentBill.InvoiceId, values, navigate, enqueueSnackbar));
        } else {
          setIsEdit(true);
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
                          disabled={!isEdit}
                          label="Tên"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                        {isEdit &&
                          <TextField
                            fullWidth
                            disabled={true}
                            label="Loại hóa đơn"
                            {...getFieldProps('type')}
                            error={Boolean(touched.type && errors.type)}
                            helperText={touched.type && errors.type}
                          />
                        }
                        {!isEdit && <TextField
                          fullWidth
                          disabled={true}
                          label="Tổng tiền"
                          {...getFieldProps('amount')}
                        />}
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          fullWidth
                          disabled={true}
                          label="Khách thuê"
                          {...getFieldProps('renter')}
                          error={Boolean(touched.renter && errors.renter)}
                          helperText={touched.renter && errors.renter}
                        />
                        <TextField
                          disabled={true}
                          fullWidth
                          label="Người quản lý"
                          {...getFieldProps('employee')}
                        />
                      </Stack>

                      {!isEdit && <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>

                        <TextField
                          disabled={true}
                          fullWidth
                          label="Loại hóa đơn"
                          {...getFieldProps('type')}
                          error={Boolean(touched.type && errors.type)}
                          helperText={touched.type && errors.type}
                        />
                        <TextField
                          fullWidth
                          disabled={!isEdit}
                          label="Tình trạng"
                          {...getFieldProps('status')}
                          error={Boolean(touched.status && errors.status)}
                          helperText={touched.status && errors.status}
                        />
                      </Stack>}
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        {!isEdit &&
                          <TextField
                            fullWidth
                            disabled={!isEdit}
                            label="Ngày tạo"
                            {...getFieldProps('createDate')}
                          />}
                        <TextField
                          fullWidth
                          disabled={!isEdit}
                          label="Ngày thanh toán"
                          {...getFieldProps('completeDate')}
                          error={Boolean(touched.completeDate && errors.completeDate)}
                          helperText={touched.completeDate && errors.completeDate}
                        />
                        <TextField
                          fullWidth
                          disabled={!isEdit}
                          label="Hạn thanh toán"
                          {...getFieldProps('dueDate')}
                          error={Boolean(touched.dueDate && errors.dueDate)}
                          helperText={touched.dueDate && errors.dueDate}
                        />
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>

                        <TextField
                          fullWidth
                          multiline={true}
                          disabled={!isEdit}
                          label="Detail"
                          {...getFieldProps('detail')}
                        />
                      </Stack>
                      {!isEdit &&
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                          <Scrollbar>
                            <TableContainer sx={{ minWidth: 800 }}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="left">Tên dịch vụ</TableCell>
                                    <TableCell align="left">Số lượng</TableCell>
                                    <TableCell align="left">Tổng tiền</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {invoiceDetail?.map((row) => {
                                    const { Price, Amount, InvoiceDetailId, Service } = row;
                                    if (Service) {
                                      return (
                                        <TableRow
                                          key={InvoiceDetailId}
                                        >
                                          <TableCell align="left">{Service?.Name}</TableCell>
                                          <TableCell align="left">{Price}</TableCell>
                                          <TableCell align="left">{Amount}</TableCell>

                                        </TableRow>
                                      );
                                    }

                                  })}
                                </TableBody>
                                {invoiceDetail && invoiceDetail[0] && !invoiceDetail[0]?.Service && (
                                  <TableBody>
                                    <TableRow>
                                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                        <p>
                                          Chưa sử dụng dịch vụ
                                        </p>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                )}
                              </Table>
                            </TableContainer>
                          </Scrollbar>
                        </Stack>}

                      {isEdit &&
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
                              {isEdit ? 'Lưu thay đổi' : 'Cập nhật hóa đơn'}
                            </LoadingButton>
                          </Box>
                        </Stack>}

                      {!isEdit && <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                          {isEdit ? 'Lưu thay đổi' : 'Cập nhật hóa đơn'}
                        </LoadingButton>
                      </Box>}



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
