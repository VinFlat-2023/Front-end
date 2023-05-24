import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import * as Yup from 'yup';
// material
import { Card, Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import { setSession } from 'src/utils/jwt';
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Bắt buộc nhập mật khẩu cũ'),
    newPassword: Yup.string().min(6, 'Mật khẩu phải tối thiểu 6 ký tự').required('Bắt buộc nhập mật khẩu mới'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Mật khẩu phải trùng khớp')
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const url = `/employees/change-password`;
      try {
        const response = await axios.put(url, {
          oldPassword: values.oldPassword,
          password: values.newPassword,
          confirmPassword: values.confirmNewPassword
        });
        setSubmitting(false);
        if (response.status) {
          resetForm();
          enqueueSnackbar(response.data.message, { variant: 'success' });
          const newToken = response.data.data;
          setSession(newToken);
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' });
        }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps('oldPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Mật khẩu cũ"
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
            />

            <TextField
              {...getFieldProps('newPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Mật khẩu mới"
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={(touched.newPassword && errors.newPassword) || 'Mật khẩu phải tối thiểu 6 ký tự'}
            />

            <TextField
              {...getFieldProps('confirmNewPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Xác nhận mật khẩu mới"
              error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Cập nhật
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
