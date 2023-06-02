import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { QuillEditor } from '../../../../../components/editor';

// material
import {
  Box,
  Card,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { UploadMultiFile, UploadSingleFile } from 'src/components/upload';
import { createFlat, getFlatTypes, updateFlat } from 'src/redux/slices/flat';
import { getRoomType } from 'src/redux/slices/room';
import { useDispatch, useSelector } from 'src/redux/store';
import { uploadImage, uploadMultipleImgae } from 'src/utils/firebase';
import { PATH_SUPERVISOR } from 'src/routes/paths';

// ----------------------------------------------------------------------
const locationFake = [{ id: '1', label: 'HCM' }];
const flatStatus = [
  { id: 1, label: 'Đang hoạt động', value: 'Active' },
  { id: 2, label: 'Bảo trì', value: 'Maintenance' },
  { id: 3, label: 'Dừng hoạt động', value: 'Inactive' },
  { id: 4, label: 'Đã đầy', value: 'Full' },
];

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

const filterNullFromFlatImages = (flatImages) => {
  const filteredItem = flatImages.filter(item => (!!item && item !== "null")) ;
  return filteredItem?.length > 0 ? filteredItem : [];
}

const extractRoomId = (rooms) => {
  return rooms.map(room => room.RoomId);
}

const extractRoomName = (rooms) => {
  return rooms.map(room => room.RoomName);
}

export default function CreateFlatForm({ currentFlat, isEditPage, isCreatePage }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { roomTypeList } = useSelector(state => state.room);
  const { flatTypeList } = useSelector(state => state.flat);

  const roomNames = !!(currentFlat?.Rooms) ? extractRoomName(currentFlat?.Rooms) : null;
  const [flatImages, setFlatImages] = useState([]);
  const [isEdit, setIsEdit] = useState(isCreatePage ?? false);
  const [numberOfRoom, setNumberOfRoom] = useState();
  const [submitButtonLabel, setSubmitButtonLabel] = useState();
  const [ isEnableFlatType, setIsEnableFlatType] = useState(false);
  const [isFlatImageChange, setIsFlatImageChange] = useState(false);
  useEffect(() => {
    dispatch(getFlatTypes());
    dispatch(getRoomType());
    setSubmitButtonLabel(isEditPage ? "Cập nhật thông tin căn hộ" : "Tạo phòng");
  }, []);

  useEffect(() => {
    setFlatImages(filterNullFromFlatImages([
      currentFlat?.FlatImageUrl1,
      currentFlat?.FlatImageUrl2,
      currentFlat?.FlatImageUrl3,
      currentFlat?.FlatImageUrl4,
      currentFlat?.FlatImageUrl5,
      currentFlat?.FlatImageUrl6]));
    setIsEnableFlatType(!!(currentFlat?.FlatType.Status));
    setNumberOfRoom(currentFlat?.MaxRoom ?? 1);
  }, [currentFlat])

  const FlatSchema = Yup.object().shape({
    name: Yup.string().required('Tên đang trống'),
    description: Yup.string().required('Mô tả đang trống'),
    flatTypeId: Yup.string().required('Loại căn hộ đang trống'),
    roomTypeId: Yup.array().min(1, 'Loại phòng đang trống'),
    flatImages: Yup.array().min(1, "Ảnh căn hộ đang trống"),
    status: Yup.string().required("Trạng thái căn hộ đang trống")
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentFlat?.Name || '',
      description: currentFlat?.Description || '',
      flatTypeId: currentFlat?.FlatTypeId || null,
      status: currentFlat?.Status || null,
      flatTypeName: currentFlat?.FlatType?.FlatTypeName || '',
      roomTypeId: (!!currentFlat?.Rooms && isEditPage) ? extractRoomId(currentFlat.Rooms) : [],
      roomTypeName: (!!currentFlat?.RoomTypeName && isEditPage) ? extractRoomName(currentFlat.Rooms) : [],
      flatImages: filterNullFromFlatImages([
        currentFlat?.FlatImageUrl1,
        currentFlat?.FlatImageUrl2,
        currentFlat?.FlatImageUrl3,
        currentFlat?.FlatImageUrl4,
        currentFlat?.FlatImageUrl5,
        currentFlat?.FlatImageUrl6]) || [],

    },
    validationSchema: FlatSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      if (isEdit) {
        try {
          const flatImageUrls = await uploadMultipleImgae(flatImages, isFlatImageChange);
          const [flatImageUrl1, flatImageUrl2, flatImageUrl3, flatImageUrl4, flatImageUrl5, flatImageUrl6] = flatImageUrls;

          try {
            if (!isEditPage){
            dispatch(createFlat(
              { ...values, flatImageUrl1:flatImageUrl1, flatImageUrl2:flatImageUrl2, flatImageUrl3:flatImageUrl3, flatImageUrl4:flatImageUrl4, flatImageUrl5:flatImageUrl5, flatImageUrl6:flatImageUrl6 }, enqueueSnackbar, navigate));
          }else {
            dispatch(updateFlat(
              currentFlat.FlatId,
              { ...values, flatImageUrl1:flatImageUrl1, flatImageUrl2:flatImageUrl2, flatImageUrl3:flatImageUrl3, flatImageUrl4:flatImageUrl4, flatImageUrl5:flatImageUrl5, flatImageUrl6:flatImageUrl6 }, enqueueSnackbar)
            );
            setIsEdit(false);
            setSubmitButtonLabel("Cập nhật thông tin căn hộ");
          }} catch (error) {
            console.log('error', error);
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

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
  console.log("values", values, errors)
  const handleDrop = useCallback(
    (acceptedFiles) => {
      setIsFlatImageChange(true);
      const files = acceptedFiles.slice(0, 6);
      setFlatImages(files);
      setFieldValue('flatImages',
        files.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }))
      );
    }, [setFieldValue]
  );


  const handleRemove = (file) => {
    const filteredItems = values.flatImages.filter((_file) => _file !== file);
    setFieldValue('flatImages', filteredItems);
  };

  const handleRemoveAll = () => {
    setFieldValue('flatImages', []);
  };

  const onSelectRoomType = (event) => {
    const value = event.target.value;
    const fieldId = event.target.id;
    let currentValue = values.roomTypeId;
    currentValue[fieldId] = value;
    setFieldValue('roomTypeId', currentValue);
  }

  const onSelectFlatType = (event) => {
    const newId = event.target.value;
    let numberOfRoom = flatTypeList?.find(item => item.FlatTypeId === +newId);
    numberOfRoom = numberOfRoom.RoomCapacity;
    setNumberOfRoom(numberOfRoom);
    setFieldValue('flatTypeId', newId);
    setFieldValue('roomTypeId', new Array(numberOfRoom));
  }

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
                    disabled={!isEdit}
                    label="Tên căn hộ"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  {isEditPage && <TextField
                    disabled={true}
                    label="Loại căn hộ"
                    {...getFieldProps('flatTypeName')}
                  />}

                  {isCreatePage && <TextField
                    select
                    fullWidth
                    label="Loại căn hộ"
                    
                    {...getFieldProps('flatTypeId')}
                    onChange={onSelectFlatType}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.flatTypeId && errors.flatTypeId)}
                    helperText={touched.flatTypeId && errors.flatTypeId}
                  >
                    <option value="" />
                    {flatTypeList.map((option) => (
                      <option key={option.FlatTypeId} value={option.FlatTypeId}>
                        {option.FlatTypeName}
                      </option>
                    ))}
                  </TextField>}
                  {isEditPage && roomNames && roomNames.map(item => {
                    return (
                      <TextField
                        fullWidth
                        label="Phòng"
                        disabled={true}
                        value={item}
                      />
                    )
                  })}
                  {isCreatePage &&
                    Array(numberOfRoom).fill(0).map((item, index) =>
                      <TextField
                        select
                        fullWidth
                        label="Phòng"
                        id={index}
                        onChange={onSelectRoomType}
                        SelectProps={{ native: true }}
                        error={Boolean(touched.roomTypeId && errors.roomTypeId)}
                        helperText={touched.roomTypeId && errors.roomTypeId}
                      >
                        <option value="" />
                        {roomTypeList.map((option) => (
                          <option key={option.RoomTypeId} value={option.RoomTypeId}>
                            {option.RoomTypeName}
                          </option>
                        ))}
                      </TextField>
                    )}
                </Stack>

                {isEdit && <Stack>
                  <div>
                    <LabelStyle>Hình ảnh căn hộ</LabelStyle>
                    <UploadMultiFile
                      maxSize={5145728}
                      accept="image/*"
                      showPreview
                      files={values.flatImages}
                      onDrop={handleDrop}
                      onRemove={handleRemove}
                      onRemoveAll={handleRemoveAll}
                      error={Boolean(touched.flatImages && errors.flatImages)}
                    />
                    {touched.flatImages && errors.flatImages && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.flatImages && errors.flatImages}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>}

                {!isEdit && <Stack>
                  {flatImages.map(image => {
                    console.log('image', image);
                    return (
                      <UploadSingleFile
                        maxSize={5145728}
                        accept="image/*"
                        file={image}
                      />)
                  })}
                </Stack>}

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Mô tả"
                    disabled={!isEdit}
                    multiline
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                  <TextField
                    select
                    fullWidth
                    disabled={!isEdit}
                    label="Trạng thái"
                    SelectProps={{ native: true }}
                    {...getFieldProps('status')}
                    error={Boolean(touched.status && errors.status)}
                    helperText={touched.status && errors.status}
                  >
                    <option value="" />
                    {flatStatus.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>

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
    </FormikProvider>
  );
}
