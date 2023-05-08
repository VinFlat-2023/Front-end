import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

// material
import { Card, Grid, Stack, TextField } from '@material-ui/core';
// utils
import axios from '../../../../../../utils/axios';
// routes
import { PATH_SUPERVISOR } from '../../../../../../routes/paths';

//----------------------------------------------------------------
export default function DetailRequestComponent({ detailRequest }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  var createDateReturn = '';
  var solvedDateReturn = '';
  if (detailRequest?.CreateDate !== null) {
    let date = new Date(detailRequest?.CreateDate);
    createDateReturn = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();
  }
  if (detailRequest?.SolveDate !== null) {
    let date = new Date(detailRequest?.SolveDate);
    solvedDateReturn = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();
  }

  const NewUserSchema = Yup.object().shape({});
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ticketName: detailRequest?.TicketName || '',
      price: detailRequest?.TotalAmount || 0,
      renterName: detailRequest?.Contract?.Renter?.FullName || '',
      contact: detailRequest?.Contract?.ContractName || '',
      createDate: createDateReturn || '',
      solvedDate: solvedDateReturn || '',
      status: detailRequest?.Status || '',
      description: detailRequest?.Description || ''
    },
    validationSchema: NewUserSchema
    // onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
    //   try {
    //     setSubmitting(false);
    //     const createValue = {
    //       roomSignName: values.name,
    //       totalSlot: values.numberOfslot,
    //       status: values.status
    //     };
    //     try {
    //       const response = await axios.put(`building/room/${roomTypeDetail.RoomId}`, createValue);

    //       resetForm();
    //       enqueueSnackbar(response.data.message, { variant: 'success' });
    //       navigate(PATH_SUPERVISOR.setting.roomType);
    //     } catch (error) {
    //       console.log('error', error);
    //       setErrors(error.message);
    //       enqueueSnackbar(error.message, { variant: 'error' });
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     setSubmitting(false);
    //     setErrors(error);
    //   }
    // }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={6} justifyContent="center" alignItems="center">
          <Grid item xs={8} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={3} sx={{ p: 2 }}>
                  <TextField
                    disabled
                    fullWidth
                    label="Tên yêu cầu"
                    {...getFieldProps('ticketName')}
                    error={Boolean(touched.ticketName && errors.ticketName)}
                    helperText={touched.ticketName && errors.ticketName}
                  />
                  <TextField
                    disabled
                    fullWidth
                    label="Tổng tiền"
                    {...getFieldProps('price')}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={3} sx={{ p: 2 }}>
                  <TextField
                    disabled
                    fullWidth
                    label="Khách thuê"
                    {...getFieldProps('renterName')}
                    error={Boolean(touched.renterName && errors.renterName)}
                    helperText={touched.renterName && errors.renterName}
                  />
                  <TextField
                    disabled
                    fullWidth
                    label="Hợp đồng"
                    {...getFieldProps('contact')}
                    error={Boolean(touched.contact && errors.contact)}
                    helperText={touched.contact && errors.contact}
                  />
                </Stack>

                <Stack direction="row" justifyContent="center" alignItems="center" spacing={3} sx={{ p: 2 }}>
                  <TextField
                    disabled
                    fullWidth
                    label="Ngày tạo yêu cầu"
                    {...getFieldProps('createDate')}
                    error={Boolean(touched.createDate && errors.createDate)}
                    helperText={touched.createDate && errors.createDate}
                  />
                  <TextField
                    disabled
                    fullWidth
                    label="Ngày hoàn thành"
                    {...getFieldProps('solvedDate')}
                    error={Boolean(touched.solvedDate && errors.solvedDate)}
                    helperText={touched.solvedDate && errors.solvedDate}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Trạng thái"
                    {...getFieldProps('status')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.status && errors.status)}
                    helperText={touched.status && errors.status}
                  >
                    <option key={1} value="Active">
                      Mới tạo
                    </option>
                    <option key={2} value="Processing">
                      Đã tiếp nhận
                    </option>
                    <option key={3} value="Confirming">
                      Đang đợi renter xác nhận
                    </option>
                    <option key={4} value="Solved">
                      Đã xác nhận
                    </option>
                    <option key={5} value="Cancelled">
                      Đã hủy
                    </option>
                  </TextField>
                </Stack>

                <Stack sx={{ p: 2 }}>
                  <TextField
                    disabled
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Mô tả"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
