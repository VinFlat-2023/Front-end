import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import * as Yup from 'yup';
// material
import { Box, Card, Grid, Stack, TextField, Typography, Switch } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import axios from '../../../../../utils/axios';
// routes
import { PATH_SUPERVISOR } from '../../../../../routes/paths';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme, customColor }) => ({
  ...theme.typography.subtitle2,
  color: customColor,
  marginBottom: theme.spacing(1)
}));
//----------------------------------------------------------------
export default function CreateFlatTypeForm({ flatTypeDetail, handleChange, flatTypeStatus }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Tên đang trống'),
    numberOfRoom: Yup.number().required('Số phòng đang trống')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: flatTypeDetail?.FlatTypeName || '',
      numberOfRoom: flatTypeDetail?.RoomCapacity || 0,
      status: flatTypeStatus
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        setSubmitting(false);
        const createValue = {
          flatTypeName: values.name,
          roomCapacity: values.numberOfRoom,
          status: values.status
        };
        try {
          const response = await axios.put(`flats/type/${flatTypeDetail?.FlatTypeId}`, createValue);

          resetForm();
          enqueueSnackbar(response.data.message, { variant: 'success' });
          navigate(PATH_SUPERVISOR.setting.flatType);
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

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

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
                    label="Tên loại căn hộ"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>
                <Stack>
                  <TextField
                    fullWidth
                    type="number"
                    label="Tổng số phòng"
                    {...getFieldProps('numberOfRoom')}
                    error={Boolean(touched.numberOfRoom && errors.numberOfRoom)}
                    helperText={touched.numberOfRoom && errors.numberOfRoom}
                  />
                </Stack>
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <span>
                      <LabelStyle customColor={flatTypeDetail?.Status === true ? 'green' : 'red'}>
                        {' '}
                        {flatTypeDetail?.Status === true ? 'Đang hoạt động' : 'Dừng hoạt động'}{' '}
                        <Switch
                          checked={flatTypeStatus}
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </LabelStyle>{' '}
                    </span>
                  </Box>
                  <Box>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      Lưu thay đổi
                    </LoadingButton>
                  </Box>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
