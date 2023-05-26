import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

// material
import { Box, Card, FormHelperText, Grid, Stack, TextField, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
// utils
import axios from '../../../../../utils/axios';
// routes
import { PATH_SUPERVISOR } from '../../../../../routes/paths';
//
import { uploadImage } from 'src/utils/firebase';
import UploadMultiFile from '../../../../../components/upload/UploadMultiFile';
import { QuillEditor } from '../../../../../components/editor';
import useAuth from '../../../../../hooks/useAuth';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function CreateEditBuildingForm({ building, area, buildingExists }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const user = useAuth();

  var imageListUpdate = [
    building?.BuildingImageUrl1,
    building?.BuildingImageUrl2,
    building?.BuildingImageUrl3,
    building?.BuildingImageUrl4,
    building?.BuildingImageUrl5,
    building?.BuildingImageUrl6
  ];

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Tên đang trống'),
    area: Yup.string().required('vị trí đang trống'),
    phone: Yup.number().required('Điện thoại đang trống'),
    address: Yup.string().required('Đại chỉ đang trống'),
    supName: Yup.string().required('Tên quản lý đang trống'),
    description: Yup.string().required('Tên quản lý đang trống'),
    images: Yup.array().min(1, 'Ảnh đang trống') && Yup.array().max(7, 'Quá nhiều ảnh')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: building.BuildingName || '',
      area: building.AreaId || '',
      phone: building.BuildingPhoneNumber || '',
      address: building.BuildingAddress || '',
      supName: user.user.FullName || '',
      description: building.Description || '',
      images: []
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // const url = await uploadImage(imageUpload);
        var arrImgURL = [];
        for (let i = 0; i < values.images.length; i++) {
          const url = await uploadImage(values.images[i]);
          arrImgURL.push(url);
        }
        setSubmitting(false);
        const createEditValue = {
          buildingName: values.name,
          buildingAddress: values.address,
          description: values.description,
          buildingPhoneNumber: values.phone,
          status: true,
          averagePrice: 0,
          areaId: values.area,
          imageUrl: arrImgURL[0] || imageListUpdate[0] || '',
          imageUrl2: arrImgURL[1] || imageListUpdate[1] || '',
          imageUrl3: arrImgURL[2] || imageListUpdate[2] || '',
          imageUrl4: arrImgURL[3] || imageListUpdate[3] || '',
          imageUrl5: arrImgURL[4] || imageListUpdate[4] || '',
          imageUrl6: arrImgURL[5] || imageListUpdate[5] || ''
        };
        try {
          console.log('value create building: ', createEditValue);
          if (buildingExists === false) {
            const rs = await axios.post('buildings', createEditValue);
            enqueueSnackbar(rs.data.message, { variant: 'success' });
            navigate(PATH_SUPERVISOR.home);
          } else {
            const rs = await axios.put(`buildings/${building.BuildingId}`, createEditValue);
            console.log('rs', rs);
            enqueueSnackbar(rs.data.message, { variant: 'success' });
            navigate(PATH_SUPERVISOR.home);
          }
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

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFieldValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleRemove = (file) => {
    const filteredItems = values.images.filter((_file) => _file !== file);
    setFieldValue('images', filteredItems);
  };

  const handleRemoveAll = () => {
    setFieldValue('images', []);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={6} justifyContent="center" alignItems="center">
          <Grid item xs={8} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={3} sx={{ p: 2 }}>
                  <TextField
                    fullWidth
                    label="Tên ký túc xá"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Tên khu vực"
                    {...getFieldProps('area')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.location && errors.location)}
                    helperText={touched.location && errors.location}
                  >
                    <option value="" />
                    {area.map((option) => (
                      <option key={option.AreaId} value={option.AreaId}>
                        {option.Name}
                      </option>
                    ))}
                  </TextField>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={3} sx={{ p: 2 }}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Stack>

                <Stack direction="row" justifyContent="center" alignItems="center" spacing={3} sx={{ p: 2 }}>
                  <TextField
                    disabled
                    fullWidth
                    label="Người quản lý"
                    {...getFieldProps('supName')}
                    error={Boolean(touched.supName && errors.supName)}
                    helperText={touched.supName && errors.supName}
                  />
                </Stack>

                <Stack>
                  <div>
                    <LabelStyle>Hình ảnh khu vực ( tối đa 6 ảnh )</LabelStyle>
                    <UploadMultiFile
                      showPreview
                      maxSize={4145728}
                      accept="image/*"
                      files={values.images}
                      onDrop={handleDrop}
                      onRemove={handleRemove}
                      onRemoveAll={handleRemoveAll}
                      error={Boolean(touched.images && errors.images)}
                    />
                    {touched.images && errors.images && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.images && errors.images}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
                {buildingExists === true ? (
                  <Stack>
                    <LabelStyle>Ảnh hiện tại</LabelStyle>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={3} sx={{ p: 2 }}>
                      {imageListUpdate.map((item) => (
                        <Box
                          component="img"
                          alt=""
                          src={item}
                          sx={item ? {
                            top: 8,
                            borderRadius: 1,
                            width: '100px',
                            height: '100px'
                          } : {
                            top: 8,
                            borderRadius: 1,
                            width: '100px',
                            height: '100px',
                            backgroundColor: '#ccd5dd'
                          }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                ) : (
                  ''
                )}

                <Stack>
                  <div>
                    <LabelStyle>Mô tả</LabelStyle>
                    <QuillEditor
                      id="post-content"
                      value={values.description}
                      onChange={(val) => setFieldValue('description', val)}
                      error={Boolean(touched.description && errors.description)}
                    />
                    {touched.description && errors.description && (
                      <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                        {touched.description && errors.description}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {buildingExists === true ? 'Chỉnh sửa ký túc xá' : 'Thêm ký túc xá'}
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
