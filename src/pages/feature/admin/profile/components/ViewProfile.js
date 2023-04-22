import { Form, FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Box, Card, Grid, Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { ROOTS_ADMIN } from 'src/routes/paths';
//

// ----------------------------------------------------------------------

export default function ViewProfile({ currentUser }) {
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: currentUser?.Username || '',
      fullname: currentUser?.FullName || '',
      email: currentUser?.Email || '',
      phone: currentUser?.Phone || '',
      address: currentUser?.Address || '',
      roleName: currentUser?.Role.RoleName || '',
      status: currentUser?.Status || ''
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setSubmitting(false);
        navigate(`${ROOTS_ADMIN}/admin_profile/edit`)
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 5 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField fullWidth disabled={true} label="Họ và tên" {...getFieldProps('fullname')} />
                  <TextField fullWidth disabled={true} label="Username" {...getFieldProps('username')} />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField fullWidth disabled={true} label="Địa chỉ email"  {...getFieldProps('email')} />
                  <TextField fullWidth disabled={true} label="Số điện thoại" {...getFieldProps('phone')} />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField fullWidth disabled={true} label="Địa chỉ" {...getFieldProps('address')} />
                  <TextField fullWidth disabled={true} label="Chức vụ" {...getFieldProps('roleName')} />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Chỉnh sửa
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
