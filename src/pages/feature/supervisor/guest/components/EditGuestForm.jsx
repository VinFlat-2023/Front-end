import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, FormHelperText, Grid, Stack, TextField, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { UploadMultiFile } from 'src/components/upload';
import { getCurrentBuilding } from 'src/redux/slices/building';
import { createContractForExistingUser, createContractForNewUser, updateContract } from 'src/redux/slices/contract';
import { getActiveFlats } from 'src/redux/slices/flat';
import { getGuestWithoutContract, updateRenterStatus } from 'src/redux/slices/guest';
import { getRoomByFlatId } from 'src/redux/slices/room';
import { uploadImage, uploadMultipleImgae } from 'src/utils/firebase';
import UploadSingleFile from '../../../../../components/upload/UploadSingleFile';
import { ExistedGuestForm } from './ExistedGuestForm';
import { NewGuestForm } from './NewGuestForm';
import { getValidationSchema } from './validationSchema';
import { PATH_SUPERVISOR } from 'src/routes/paths';

// ----------------------------------------------------------------------
const STATUS = [
  {
    id: 1,
    value: true,
    label: "Đang hoạt động"
  },
  {
    id: 2,
    value: false,
    label: "Ngưng hoạt động"
  }

]


// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function EditGuestForm({ currentGuest}) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [isEdit, setIsEdit] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: currentGuest?.Username,
      renterEmail: currentGuest?.Email,
      renterPhone: currentGuest?.Phone,
      renterBirthDate: currentGuest?.BirthDateReturn,
      address: currentGuest?.Address,
      gender: currentGuest?.Gender === 'Male' ? 'Nam' : 'Nữ',
      citizenNumber: currentGuest?.CitizenNumber,
      status: currentGuest?.Status === true ? 'Đang hoạt động' : 'Ngưng hoạt động',
    },

    onSubmit: async (values, { setSubmitting }) => {
      if (isEdit) {
        try {
          setSubmitting(true);
          dispatch(updateRenterStatus(currentGuest.RenterId, {"status":values.status}, enqueueSnackbar));
        } catch (ex) {
          enqueueSnackbar("Có lỗi xảy ra", { variant: 'error' })
          setSubmitting(false);
        }
      } else {
        setIsEdit(true);
      }
    }
  });

  const { values, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;


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
                    label="Tên tài khoản"
                    disabled={true}
                    {...getFieldProps('fullName')}
                  />

                  <TextField
                    fullWidth
                    label="Địa chỉ email"
                    disabled={true}
                    {...getFieldProps('renterEmail')}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    disabled={true}
                    {...getFieldProps('renterPhone')}
                  />
                  <TextField
                    fullWidth
                    label="Ngày sinh"
                    disabled={true}
                    {...getFieldProps('renterBirthDate')}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    disabled={true}
                    {...getFieldProps('address')}
                  />
                  <TextField
                    fullWidth
                    label="CMND/CCCD"
                    disabled={true}
                    {...getFieldProps('citizenNumber')}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Giới tính"
                    disabled={true}
                    {...getFieldProps('gender')}
                  />
                  <TextField
                    fullWidth
                    label="Trạng thái"
                    disabled={!isEdit}
                    select={isEdit}
                    {...getFieldProps('status')}
                    SelectProps={{ native: true }}
                  >
                    <option value="" />
                    {STATUS.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>


                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {isEdit ? "Lưu thay đổi" : "Cập nhật thông tin khách thuê"}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider >
  );
}
