import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import { useCallback, useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'src/redux/store';
import { getRoomType, updateRoom } from 'src/redux/slices/room';
import { getCurrentBuilding } from 'src/redux/slices/building';
import { uploadImage, uploadMultipleImgae } from 'src/utils/firebase';
import { UploadMultiFile, UploadSingleFile } from 'src/components/upload';
import { getFlatTypes } from 'src/redux/slices/flat';

// ----------------------------------------------------------------------
const roomStatusOptions = [
  { id: 1, label: 'Đang hoạt động', value: 'Active' },
  { id: 2, label: 'Bảo trì', value: 'Maintenance' },
  { id: 3, label: 'Hết chỗ', value: 'Full' },
  { id: 4, label: 'Dừng hoạt động', value: 'Inactive' },
];

const extractRoomImages = (roomImages) => {
  const filtered = roomImages.filter(image => !!image);
  console.log("room", filtered)
  return (!!filtered && filtered?.length > 0) ? filtered : [];
}
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function CreateRoomForm({ currentRoom }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roomTypeList } = useSelector(state => state.room);
  const { flatTypeList } = useSelector(state => state.flat);
  const { currentBuilding } = useSelector(state => state.building);
  const { enqueueSnackbar } = useSnackbar();

  const [roomImages, setRoomImages] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [canChangeRoomType, setCanChangeRoomType] = useState(true);
  const [ isRoomImageChange, setIsRoomImageChange] = useState(false);


  console.log("current Room", currentRoom)
  useEffect(() => {
    dispatch(getFlatTypes());
    dispatch(getRoomType());
    dispatch(getCurrentBuilding());

  }, []);

  useEffect(() => {
    setRoomImages(extractRoomImages([
      currentRoom?.RoomImageUrl1,
      currentRoom?.RoomImageUrl2,
      currentRoom?.RoomImageUrl3,
      currentRoom?.RoomImageUrl4,
      currentRoom?.RoomImageUrl5,
      currentRoom?.RoomImageUrl6,
    ]))
    setCanChangeRoomType(currentRoom?.IsAnyOneRented);
  }, [currentRoom])
  const RoomSchema = Yup.object().shape({
    roomName: Yup.string().required('Tên đang trống'),
    electricityAttribute: Yup.string().required('Chỉ số điện đang trống'),
    waterAttribute: Yup.string().required('Chỉ số nước đang trống'),
    roomTypeId: Yup.string().required('Loại phòng đang trống'),
    status: Yup.string().required('Trạng thái phòng đang trống'),
    flatId: Yup.string().required('Tên căn hộ đang trống'),
    roomImages: Yup.array().min(0, 'Hình ảnh phòng đang trống'),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      roomName: currentRoom?.RoomName || "",
      electricityAttribute: currentRoom?.ElectricityAttribute || "",
      waterAttribute: currentRoom?.WaterAttribute || "",
      roomTypeId: currentRoom?.RoomTypeId || "",
      roomTypeName: currentRoom?.RoomType?.RoomTypeName || "",
      status: currentRoom?.Status || "",
      flatId: currentRoom?.FlatId || "",
      flatName: currentRoom?.flatName || "",
      roomImages: roomImages,
      description: currentRoom?.Description || null,
    },
    validationSchema: RoomSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      if (isEdit) {
        try {
          const roomImageUrls = await uploadMultipleImgae(roomImages, isRoomImageChange);

          const [roomImageUrl1, roomImageUrl2, roomImageUrl3, roomImageUrl4, roomImageUrl5, roomImageUrl6] = roomImageUrls;
          //console.log('upload data',{ ...values, buildingId: currentBuilding.BuildingId, roomImageUrl1, roomImageUrl2, roomImageUrl3, roomImageUrl4, roomImageUrl5, roomImageUrl6 });

          setSubmitting(false);
          try {
            dispatch(updateRoom(currentRoom.RoomId, { ...values, buildingId: currentBuilding.BuildingId, roomImageUrl1, roomImageUrl2, roomImageUrl3, roomImageUrl4, roomImageUrl5, roomImageUrl6 }, enqueueSnackbar))
            console.log('upload data', { ...values, buildingId: currentBuilding.BuildingId, roomImageUrl1, roomImageUrl2, roomImageUrl3, roomImageUrl4, roomImageUrl5, roomImageUrl6 });
            setIsEdit(false);
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
      } else {
        setIsEdit(true);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  // console.log("values", values, errors)
  const handRoomImagesDrop = useCallback(
    (acceptedFiles) => {
      setIsRoomImageChange(true);
      const files = acceptedFiles.slice(0, 6);
      setRoomImages(files);
      setFieldValue(
        'roomImages',
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
    const filteredItems = values.roomImages.filter((_file) => _file !== file);
    setFieldValue('roomImages', filteredItems);
  };

  const handleRemoveAll = () => {
    setFieldValue('roomImages', []);
  };

  const getRoomTypeLabel = () => {
    const id = getFieldProps('roomTypeId');
    const room = roomTypeList.find(item => item.RoomTypeId === id.value);
    return isEdit ? id : room?.RoomTypeName;
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
                    label="Tên phòng"
                    disabled={!isEdit}
                    {...getFieldProps('roomName')}
                    error={Boolean(touched.roomName && errors.roomName)}
                    helperText={touched.roomName && errors.roomName}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Tên căn hộ"
                    disabled={true}
                    {...getFieldProps('flatName')}
                  />
                  {!isEdit && <TextField
                    fullWidth
                    label="Loại phòng"
                    disabled={true}
                    {...getFieldProps('roomTypeName')}
                  />}
                  {isEdit && <TextField
                    select
                    fullWidth
                    disabled={canChangeRoomType}
                    label="Loại phòng"
                    {...getFieldProps('roomTypeId')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.roomId && errors.roomId)}
                    helperText={touched.roomId && errors.roomId}
                  >
                    <option value="" />
                    {roomTypeList.map((option) => (
                      <option key={option.RoomTypeId} value={option.RoomTypeId}>
                        {option.RoomTypeName}
                      </option>
                    ))}
                  </TextField>}
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Chỉ số điện"
                    disabled={!isEdit}
                    {...getFieldProps('electricityAttribute')}
                    error={Boolean(touched.electricityAttribute && errors.electricityAttribute)}
                    helperText={touched.electricityAttribute && errors.electricityAttribute}
                  />
                  <TextField
                    fullWidth
                    label="Chỉ số nước"
                    disabled={!isEdit}
                    {...getFieldProps('waterAttribute')}
                    error={Boolean(touched.waterAttribute && errors.waterAttribute)}
                    helperText={touched.waterAttribute && errors.waterAttribute}
                  />
                  <TextField
                    select={isEdit}
                    fullWidth
                    label="Trạng thái"
                    disabled={!isEdit}
                    {...getFieldProps('status')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.status && errors.status)}
                    helperText={touched.status && errors.status}
                  >
                    <option value="" />
                    {roomStatusOptions.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                {isEdit && <Stack>
                  <div>
                    <LabelStyle>Hình ảnh phòng</LabelStyle>
                    <UploadMultiFile
                      showPreview
                      maxSize={3145728}
                      accept="image/*"
                      files={values.roomImages}
                      onDrop={handRoomImagesDrop}
                      onRemove={handleRemove}
                      onRemoveAll={handleRemoveAll}
                      error={Boolean(touched.roomImages && errors.roomImages)}
                    />
                    {touched.roomImages && errors.roomImages && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.roomImages && errors.roomImages}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>}

                {!isEdit && roomImages && roomImages.map(image => {
                  console.log("img", image)
                  return (
                    <UploadSingleFile
                      maxSize={5145728}
                      accept="image/*"
                      file={image}
                    />)
                })}

                <Stack>
                  <TextField
                    disabled={!isEdit}
                    label={"Mô tả"}
                    {...getFieldProps('description')}

                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {isEdit ? "Lưu thay đổi" : "Cập nhật tình trạng phòng"}
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
