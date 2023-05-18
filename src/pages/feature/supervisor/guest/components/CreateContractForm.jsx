import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

// material
import { Box, Card, FormHelperText, Grid, Stack, TextField, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
// utils
// routes
//
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentBuilding } from 'src/redux/slices/building';
import { createContract } from 'src/redux/slices/contract';
import { getFlatList } from 'src/redux/slices/flat';
import { getGuestList } from 'src/redux/slices/guest';
import { getRoomList } from 'src/redux/slices/room';
import { uploadImage } from 'src/utils/firebase';
import UploadSingleFile from '../../../../../components/upload/UploadSingleFile';

// ----------------------------------------------------------------------
const gender = [{ id: '1', label: 'Nam' }, { id: '2', label: 'Nữ' }];

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function CreateContractForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { currentBuilding } = useSelector(state => state.building);
  const { flatList } = useSelector(state => state.flat);
  const { roomList } = useSelector(state => state.room);


  const [frontCitizenCard, setFrontCitizenCard] = useState(null);
  const [backCitizenCard, setBackCitizenCard] = useState(null);

  useEffect(() => {
    dispatch(getCurrentBuilding());
    dispatch(getRoomList());
    dispatch(getGuestList());
    dispatch(getFlatList());
  }, [])

  const NewUserSchema = Yup.object().shape({
    contractName: Yup.string().required('Tên hợp đồng đang trống'),
    flatId: Yup.number().required('Tên căn hộ đang trống'),
    roomId: Yup.string().required('Tên phòng đang trống'),
    priceForRent: Yup.string().required('Tiền thuê KTX đang trống'),
    priceForService: Yup.string().required('Tiền dịch vụ đang trống'),
    priceForElecticity: Yup.string().required('Tiền điện đang trống'),
    priceForWater: Yup.string().required('Tiền nước đang trống'),
    dateSigned: Yup.string().required('Ngày kí đang trống'),
    startDate: Yup.string().required('Ngày bắt đầu đang trống'),
    endDate: Yup.string().required('Ngày kết thúc đang trống'),
    fullName: Yup.string().required('Tên khách thuê đang trống'),

  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      contractName: "",
      dateSigned: "",
      startDate: "",
      description: "",
      endDate: "",
      contractStatus: "active",
      priceForWater: "",
      priceForElectricity: "",
      priceForService: "",
      priceForRent: "",
      flatId: "",
      roomId: "",
      renterUserName: "",
      fullName: "",
      renterEmail: "",
      renterPhone: "",
      renterBirthDate: "",
      address: "",
      gender: "",
      citizenNumber: "",
      images: [],
      backCitizenCard: [],
    },

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        console.log(values);
        const fronCitizenCardUrl = await uploadImage(frontCitizenCard);
        const backCitizenCardUrl = await uploadImage(backCitizenCard);
        try {
          dispatch(createContract({ ...values, citizenCardFrontImageUrl: fronCitizenCardUrl, citizenCardBackImageUrl: backCitizenCardUrl }, navigate, enqueueSnackbar))
        } catch (error) {
          console.error('error', error);
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
      const file = acceptedFiles[0];
      setFrontCitizenCard(file);
      if (file) {
        setFieldValue('images', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  const handleBackCitizenCardDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setBackCitizenCard(file);
      if (file) {
        setFieldValue('backCitizenCard', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 5 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Tên hợp đồng"
                    {...getFieldProps('contractName')}
                    error={Boolean(touched.contractName && errors.contractName)}
                    helperText={touched.contractName && errors.contractName}
                  />

                  <TextField
                    fullWidth
                    disabled
                    label="Tên tòa nhà kTX xá đang quản lý"
                    value={currentBuilding?.BuildingAddress}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    select
                    fullWidth
                    label="Căn hộ"
                    {...getFieldProps('flatId')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.flatId && errors.flatId)}
                    helperText={touched.flatId && errors.flatId}
                  >
                    <option value="" />
                    {flatList?.map((option) => (
                      <option key={option.FlatId} value={option.FlatId}>
                        {option.Description}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Phòng"
                    {...getFieldProps('roomId')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.roomId && errors.roomId)}
                    helperText={touched.roomId && errors.roomId}
                  >
                    <option value="" />
                    {roomList?.map((option) => (
                      <option key={option.RoomId} value={option.RoomId}>
                        {option.RoomName}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Tiền thuê KTX (tháng)"
                    {...getFieldProps('priceForRent')}
                    error={Boolean(touched.priceForRent && errors.priceForRent)}
                    helperText={touched.priceForRent && errors.priceForRent}
                  />
                  <TextField
                    fullWidth
                    label="Tiền dịch vụ (tháng)"
                    {...getFieldProps('priceForService')}
                    error={Boolean(touched.priceForService && errors.priceForService)}
                    helperText={touched.priceForService && errors.priceForService}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Tiền điện trên số"
                    {...getFieldProps('priceForElectricity')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Tiền nước trên số"
                    {...getFieldProps('priceForWater')}
                    error={Boolean(touched.priceForElectricity && errors.priceForElectricity)}
                    helperText={touched.priceForElectricity && errors.priceForElectricity}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Thông tin thêm về hợp đồng"
                    {...getFieldProps('description')}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Ngày kí"
                    {...getFieldProps('dateSigned')}
                    error={Boolean(touched.dateSigned && errors.dateSigned)}
                    helperText={touched.dateSigned && errors.dateSigned}
                  />
                  <TextField
                    fullWidth
                    label="Ngày bắt đầu"
                    {...getFieldProps('startDate')}
                    error={Boolean(touched.startDate && errors.startDate)}
                    helperText={touched.startDate && errors.startDate}
                  />
                  <TextField
                    fullWidth
                    label="Ngày kết thúc"
                    {...getFieldProps('endDate')}
                    error={Boolean(touched.endDate && errors.endDate)}
                    helperText={touched.endDate && errors.endDate}
                  />
                </Stack>

                <Stack>
                  <div>Thông tin khách thuê</div>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    {...getFieldProps('fullName')}
                    error={Boolean(touched.fullName && errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                  <TextField
                    fullWidth
                    label="Địa chỉ email"
                    {...getFieldProps('renterEmail')}
                    error={Boolean(touched.renterEmail && errors.renterEmail)}
                    helperText={touched.renterEmail && errors.renterEmail}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Tên tài khoản"
                    {...getFieldProps('renterUserName')}
                    error={Boolean(touched.fullName && errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                  <TextField
                    fullWidth
                    label="Ngày sinh"
                    {...getFieldProps('renterBirthDate')}
                    error={Boolean(touched.renterBirthDate && errors.renterBirthDate)}
                    helperText={touched.renterBirthDate && errors.renterBirthDate}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    {...getFieldProps('renterPhone')}
                    error={Boolean(touched.renterPhone && errors.renterPhone)}
                    helperText={touched.renterPhone && errors.renterPhone}
                  />
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="CMND/CCCD"
                    {...getFieldProps('citizenNumber')}
                    error={Boolean(touched.citizenNumber && errors.citizenNumber)}
                    helperText={touched.citizenNumber && errors.citizenNumber}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Giới tính"
                    {...getFieldProps('gender')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.gender && errors.gender)}
                    helperText={touched.gender && errors.gender}
                  >
                    <option value="" />
                    {gender.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Stack>
                  <div>
                    <LabelStyle>Hình ảnh hợp đồng</LabelStyle>
                    <UploadSingleFile
                      maxSize={5145728}
                      accept="image/*"
                      file={values.images}
                      onDrop={handleDrop}
                      error={Boolean(touched.images && errors.images)}
                    />
                    {touched.images && errors.images && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.images && errors.images}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>

                <Stack>
                  <div>
                    <LabelStyle>Hình ảnh hợp đồng</LabelStyle>
                    <UploadSingleFile
                      maxSize={5145728}
                      accept="image/*"
                      file={values.backCitizenCard}
                      onDrop={handleBackCitizenCardDrop}
                      error={Boolean(touched.backCitizenCard && errors.backCitizenCard)}
                    />
                    {touched.backCitizenCard && errors.backCitizenCard && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.backCitizenCard && errors.backCitizenCard}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>



                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Nhập hợp đồng
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
