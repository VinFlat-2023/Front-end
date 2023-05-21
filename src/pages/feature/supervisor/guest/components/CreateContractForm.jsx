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
import { getGuestWithoutContract } from 'src/redux/slices/guest';
import { getRoomByFlatId } from 'src/redux/slices/room';
import { uploadImage, uploadMultipleImgae } from 'src/utils/firebase';
import UploadSingleFile from '../../../../../components/upload/UploadSingleFile';
import { ExistedGuestForm } from './ExistedGuestForm';
import { NewGuestForm } from './NewGuestForm';
import { getValidationSchema } from './validationSchema';
import { PATH_SUPERVISOR } from 'src/routes/paths';

// ----------------------------------------------------------------------
const gender = [{ id: '1', label: 'Nam' }, { id: '2', label: 'Nữ' }];
const contractStatus = [
  { id: '1', label: 'Đang hoạt động', value: 'active' },
  { id: '2', label: 'Hết hạn', value: 'inActive' },
  { id: '3', label: 'Tạm dừng', value: 'suspend' },
];

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function CreateContractForm({ currentContract, isNewUser, isEditPage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { activeFlats } = useSelector(state => state.flat);
  const { roomInFlats } = useSelector(state => state.room);
  const { currentBuilding } = useSelector(state => state.building);
  const { guestWithoutContract } = useSelector(state => state.guest);

  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [flatId, setFlatId] = useState(currentContract?.FlatId);
  const [submitButtonLabel, setSubmitButtonLabel] = useState('');

  const [frontCitizenCard, setFrontCitizenCard] = useState(null);
  const [backCitizenCard, setBackCitizenCard] = useState(null);
  const [contractImages, setContractImages] = useState([]);



  useEffect(() => {
    setIsEdit(!isEditPage)
    setSubmitButtonLabel(isEditPage ? "Cập nhật hợp đồng" : "Nhập hợp đồng");
    dispatch(getActiveFlats());
    dispatch(getCurrentBuilding());
    dispatch(getGuestWithoutContract());
  }, []);

  useEffect(() => {
    dispatch(getRoomByFlatId(flatId));
  }, [flatId]);


  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: getValidationSchema(isEditPage, isNewUser),
    initialValues: {
      contractName: currentContract?.ContractName || "",
      dateSigned: currentContract?.DateSignedReturn || "",
      startDate: currentContract?.StartDateReturn || "",
      description: currentContract?.Description || "",
      endDate: currentContract?.EndDateReturn || "",
      contractStatus: "active",
      priceForWater: currentContract?.PriceForWater || "",
      priceForElectricity: currentContract?.PriceForElectricity || "",
      priceForService: currentContract?.PriceForService || "",
      priceForRent: currentContract?.PriceForRent || "",
      flatId: currentContract?.FlatId || "",
      roomId: currentContract?.RoomId || "",
      renterUserName: currentContract?.Renter?.Username || "",
      fullName: currentContract?.Renter?.FullName || "",
      renterEmail: "",
      renterPhone: "",
      renterBirthDate: "",
      address: "",
      gender: "",
      citizenNumber: "",
      frontCitizenCard: null,
      backCitizenCard: null,
      contractImages: currentContract?.ImageUrls || [],
    },

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      if (isEdit) {
        try {
          try {
            uploadMultipleImgae(contractImages).then (async (contractImagesUrls) => {
            const [contractImageUrl1, contractImageUrl2, contractImageUrl3, contractImageUrl4] = contractImagesUrls;
             if (isEditPage) {
              dispatch(updateContract(currentContract.ContractId, { ...values, contractImageUrl1: contractImageUrl1, contractImageUrl2: contractImageUrl2, contractImageUrl3: contractImageUrl3, contractImageUrl4: contractImageUrl4 }, navigate, enqueueSnackbar))
            } else {
              const frontCitizenCardUrl = await uploadImage(frontCitizenCard);
              const backCitizenCardUrl = await uploadImage(backCitizenCard);
              dispatch(isNewUser ?
                createContractForNewUser({
                  ...values,
                  citizenCardFrontImageUrl: frontCitizenCardUrl,
                  citizenCardBackImageUrl: backCitizenCardUrl,
                  contractImageUrl1: contractImageUrl1,
                  contractImageUrl2: contractImageUrl2,
                  contractImageUrl3: contractImageUrl3,
                  contractImageUrl4: contractImageUrl4
                }, navigate, enqueueSnackbar)
                : createContractForExistingUser(selectedUser.RenterId, {
                  ...values,
                  citizenCardFrontImageUrl: frontCitizenCardUrl,
                  citizenCardBackImageUrl: backCitizenCardUrl,
                  RenterId: selectedUser.RenterId,
                  contractImageUrl1: contractImageUrl1,
                  contractImageUrl2: contractImageUrl2,
                  contractImageUrl3: contractImageUrl3,
                  contractImageUrl4: contractImageUrl4
                }, navigate, enqueueSnackbar)
              )
             }
            })
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
      } else {
        setIsEdit(true);
        setSubmitButtonLabel("Lưu thay đổi");
      }
    }
  });


  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps, getFieldMeta } = formik;


  const handleSelectUser = (event) => {
    const newUser = guestWithoutContract.find(item => item.Username === event.target.value);
    setSelectedUser(newUser);
    setFieldValue('fullName', newUser.FullName);
  };

  const handleFlatChange = (event) => {
    // get field
    const id = event.target.value;
    //add custom logic on field
    setFlatId(id);
    //set field on formik
    setFieldValue('flatId', id);
  };


  const handleFrontCitizenCardDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFrontCitizenCard(file);
      if (file) {
        setFieldValue('frontCitizenCard', {
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
    }, [setFieldValue]);

  const handContractImagesDrop = useCallback(
    (acceptedFiles) => {
      const files = acceptedFiles.slice(0, 4);
      setContractImages(files);
      setFieldValue(
        'contractImages',
        files.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleRemove = (file) => {
    const filteredItems = values.contractImages.filter((_file) => _file !== file);
    setFieldValue('contractImages', filteredItems);
  };

  const handleRemoveAll = () => {
    setFieldValue('contractImages', []);
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
                    disabled={!isEdit}
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
                    select={!isEditPage}
                    disabled={isEditPage}
                    fullWidth
                    label="Căn hộ"
                    {...getFieldProps('flatId')}
                    onChange={handleFlatChange}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.flatId && errors.flatId)}
                    helperText={touched.flatId && errors.flatId}
                  >
                    <option value="" />
                    {activeFlats?.map((option) => (
                      <option key={option.FlatId} value={option.FlatId}>
                        {option.Description}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    select={!isEditPage}
                    disabled={isEditPage}
                    label="Phòng"
                    {...getFieldProps('roomId')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.roomId && errors.roomId)}
                    helperText={touched.roomId && errors.roomId}
                  >
                    <option value="" />
                    {roomInFlats?.map((option) => (
                      <option key={option.RoomId} value={option.RoomId}>
                        {option.RoomName}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled={!isEdit}
                    label="Tiền thuê KTX (tháng)"
                    {...getFieldProps('priceForRent')}
                    error={Boolean(touched.priceForRent && errors.priceForRent)}
                    helperText={touched.priceForRent && errors.priceForRent}
                  />
                  <TextField
                    fullWidth
                    disabled={!isEdit}
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
                    disabled={!isEdit}
                    {...getFieldProps('priceForElectricity')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Tiền nước trên số"
                    disabled={!isEdit}
                    {...getFieldProps('priceForWater')}
                    error={Boolean(touched.priceForElectricity && errors.priceForElectricity)}
                    helperText={touched.priceForElectricity && errors.priceForElectricity}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  {isEditPage && <TextField
                    fullWidth
                    disabled
                    label="Mã hợp đồng"
                    value={currentContract?.ContractSerialNumber}
                  />}

                  <TextField
                    fullWidth
                    disabled={!isEdit}
                    multiline={true}
                    label="Thông tin thêm về hợp đồng"
                    {...getFieldProps('description')}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Ngày kí"
                    disabled={!isEdit}
                    {...getFieldProps('dateSigned')}
                    error={Boolean(touched.dateSigned && errors.dateSigned)}
                    helperText={touched.dateSigned && errors.dateSigned}
                  />
                  <TextField
                    fullWidth
                    label="Ngày bắt đầu"
                    disabled={!isEdit}
                    {...getFieldProps('startDate')}
                    error={Boolean(touched.startDate && errors.startDate)}
                    helperText={touched.startDate && errors.startDate}
                  />
                  <TextField
                    fullWidth
                    label="Ngày kết thúc"
                    disabled={!isEdit}
                    {...getFieldProps('endDate')}
                    error={Boolean(touched.endDate && errors.endDate)}
                    helperText={touched.endDate && errors.endDate}
                  />
                </Stack>

                {!!!isEditPage && <>
                  <Stack>
                    <div>Thông tin khách thuê</div>
                  </Stack>
                  {isNewUser && !!!isEditPage && <NewGuestForm getFieldProps={getFieldProps} touched={touched} isNewUser={isNewUser} errors={errors} />}
                  {!isNewUser && !!!isEditPage && <ExistedGuestForm selectedUser={selectedUser} handleSelectUser={handleSelectUser} guestList={guestWithoutContract} />}

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <div>
                      <LabelStyle>Mặt trước CMND/CCCD</LabelStyle>
                      <UploadSingleFile
                        maxSize={5145728}
                        accept="image/*"
                        file={values.frontCitizenCard}
                        onDrop={handleFrontCitizenCardDrop}
                        error={Boolean(touched.frontCitizenCard && errors.frontCitizenCard)}
                      />
                      {touched.frontCitizenCard && errors.frontCitizenCard && (
                        <FormHelperText error sx={{ px: 2 }}>
                          {touched.frontCitizenCard && errors.frontCitizenCard}
                        </FormHelperText>
                      )}
                    </div>

                    <div>
                      <LabelStyle>Mặt sau CMND/CCCD</LabelStyle>
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
                  </Stack></>}

                {!isEdit && currentContract && currentContract?.ImageUrls &&
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    {currentContract?.ImageUrls.map(image => {
                      return (
                        <UploadSingleFile
                          maxSize={5145728}
                          accept="image/*"
                          file={image}
                        />)
                    })}

                  </Stack>}


                {(!!!isEditPage || isEdit) &&
                  < Stack >
                    <div>
                      <LabelStyle>Hình ảnh hợp đồng</LabelStyle>
                      <UploadMultiFile
                        showPreview
                        maxSize={3145728}
                        accept="image/*"
                        files={values.contractImages}
                        onDrop={handContractImagesDrop}
                        onRemove={handleRemove}
                        onRemoveAll={handleRemoveAll}
                        error={Boolean(touched.contractImages && errors.contractImages)}
                      />
                      {touched.contractImages && errors.contractImages && (
                        <FormHelperText error sx={{ px: 2 }}>
                          {touched.contractImages && errors.contractImages}
                        </FormHelperText>
                      )}
                    </div>
                  </Stack>}
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {submitButtonLabel}
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
