import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack5';
// material
import { Container } from '@material-ui/core';
// routes
import { PATH_SUPERVISOR } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import CreateRoomForm from './components/CreateRoomTypeForm';
import EditRoomTypeForm from './components/EditRoomTypeForm';
// API
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

export default function CreateEditFlatTypePage() {
  const { themeStretch } = useSettings();
  const { id } = useParams(); // useParams use to get id of area on URL area/:id
  const { enqueueSnackbar } = useSnackbar();

  const [roomTypeDetail, setRoomTypeDetail] = useState('');

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    try {
      const response = await axios.get(`building/room/${id}`);
      setRoomTypeDetail(response.data.data);
    } catch (error) {
      if (error.status === 'Not Found') {
        setRoomTypeDetail('');
      }
      return console.error(error);
    }
  };

  const handleChange = async () => {
    // try {
    //   const response = await axios.put(`flats/type/${id}/toggle-status`);
    //   enqueueSnackbar(response.data.message, { variant: 'success' });
    //   setStatus(!status);
    // } catch (error) {
    //   console.log('error: ', error);
    //   enqueueSnackbar(error.message, { variant: 'error' });
    // }
  };

  return (
    <Page title={id ? 'Chỉnh sửa phòng' : 'Thêm phòng'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={id ? 'Chỉnh sửa phòng' : 'Thêm phòng'}
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Cài đặt', href: PATH_SUPERVISOR.setting.roomType },
            { name: 'Danh sách phòng', href: PATH_SUPERVISOR.setting.roomType },
            { name: id ? 'Chỉnh sửa phòng' : 'Thêm phòng' }
          ]}
        />
        {id ? (
          <EditRoomTypeForm handleChange={handleChange} roomTypeDetail={roomTypeDetail} />
        ) : (
          <CreateRoomForm />
        )}
      </Container>
    </Page>
  );
}
