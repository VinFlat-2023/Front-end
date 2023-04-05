import { Page } from "@react-pdf/renderer";
import { Form, FormikProvider, useFormik } from "formik";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { LoadingButton } from '@material-ui/lab';
import { PATH_DASHBOARD } from "src/routes/paths";
import {
  Card,
  Chip,
  Grid,
  Stack,
  Radio,
  Switch,
  Select,
  TextField,
  InputLabel,
  Typography,
  RadioGroup,
  FormControl,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel,
  Container
} from '@material-ui/core';

export default function Dormitory() {

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {

    },
    // validationSchema: NewUserSchema,
    // onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
    //     try {
    //         await fakeRequest(500);
    //         resetForm();
    //         setSubmitting(false);
    //         enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
    //         navigate(PATH_DASHBOARD.user.list);
    //     } catch (error) {
    //         console.error(error);
    //         setSubmitting(false);
    //         setErrors(error);
    //     }
    // }
  });

  return (
    <Page title="Toà nhà KTX">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={'Toà nhà KTX'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD?.root || '/Dashboard' },
            {
              name: 'Toà nhà KTX',
              href: PATH_DASHBOARD.dormitory?.root
            }
          ]}
        />

        <FormikProvider value={formik}>
          <Form>
            <Grid container spacing={6}
              justifyContent="center"
              alignItems="center">
              <Grid item xs={8} md={8}>
                <Card sx={{ p: 3 }}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    sx={{ p: 2 }}
                  >
                    <TextField
                      label="Tên ký túc xá"
                      style={{ width: '40%' }}
                    // {...getFieldProps('name')}
                    // error={Boolean(touched.name && errors.name)}
                    // helperText={touched.name && errors.name}
                    />
                    <TextField
                      label="Tổng số căn hộ"
                      style={{ width: '40%' }}
                    // {...getFieldProps('name')}
                    // error={Boolean(touched.name && errors.name)}
                    // helperText={touched.name && errors.name}
                    />
                  </ Stack>

                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    sx={{ p: 2 }}>
                    <TextField
                      label="Số điện thoại"
                      style={{ width: '40%' }}
                    // {...getFieldProps('name')}
                    // error={Boolean(touched.name && errors.name)}
                    // helperText={touched.name && errors.name}
                    />
                    <TextField
                      label="Địa chỉ"
                      style={{ width: '40%' }}
                    // {...getFieldProps('name')}
                    // error={Boolean(touched.name && errors.name)}
                    // helperText={touched.name && errors.name}
                    />
                  </ Stack>

                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    sx={{ p: 2 }}>
                    <TextField
                      label="Khu vực"
                      style={{ width: '40%' }}
                    // {...getFieldProps('name')}
                    // error={Boolean(touched.name && errors.name)}
                    // helperText={touched.name && errors.name}
                    />
                    <TextField
                      label="Người quản lý"
                      style={{ width: '40%' }}
                    // {...getFieldProps('name')}
                    // error={Boolean(touched.name && errors.name)}
                    // helperText={touched.name && errors.name}
                    />
                  </ Stack>

                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    sx={{ p: 2 }}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Description"
                      multiline
                      style={{ width: '85%' }}
                      rows={4}
                    />
                  </ Stack>
                  <LoadingButton style={{ float: 'right', width: '200px' }} type="submit" fullWidth variant="contained" size="large">
                    Tạo toà nhà
                    {/* {!isEdit ? 'Create Product' : 'Save Changes'} */}
                  </LoadingButton>
                </ Card>
              </ Grid>
            </ Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  )
}