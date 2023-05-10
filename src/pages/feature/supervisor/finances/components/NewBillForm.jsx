import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
} from '@material-ui/core';
//
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

BillForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function NewBillForm({ isEdit, currentBill }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const BillFormSchema = Yup.object().shape({
    username: Yup.string().required('User name is required'),
    fullname: Yup.string().required('Full name is required'),
    email: Yup.string().required('Email is required').email(),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    roleId: Yup.string().required('Role is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: currentUser?.Username || '',
      fullname: currentUser?.FullName || '',
      email: currentUser?.Email || '',
      phone: currentUser?.Phone || '',
      address: currentUser?.Address || '',
      roleId: currentUser?.Role.RoleId || '',
      status: currentUser?.Status || ''
    },
    validationSchema: BillFormSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        setSubmitting(false);
        isEdit
          ? dispatch(updateUserProfile(currentUser.EmployeeId, values, setErrors, resetForm, enqueueSnackbar, navigate))
          : dispatch(createNewEmployee(values, setErrors, resetForm, enqueueSnackbar, navigate));
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
      if (file) {
        setFieldValue('avatarUrl', {
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
                    label="Họ và tên"
                    {...getFieldProps('fullname')}
                    error={Boolean(touched.fullname && errors.fullname)}
                    helperText={touched.fullname && errors.fullname}
                  />
                  <TextField
                    fullWidth
                    label="Username"
                    {...getFieldProps('username')}
                    disabled={isEdit}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Địa chỉ email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField
                    disabled={isEdit}
                    select
                    fullWidth
                    label="Chức vụ"
                    {...getFieldProps('roleId')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.roleId && errors.roleId)}
                    helperText={touched.roleId && errors.roleId}
                  >
                    <option value="" />
                    {roles.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Thêm thành viên' : 'Lưu thay đổi'}
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
