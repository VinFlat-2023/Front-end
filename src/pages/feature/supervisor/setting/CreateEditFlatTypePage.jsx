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
import CreateFlatTypeForm from './components/CreateFlatTypeForm';
import EditFlatTypeForm from './components/EditFlatTypeForm';
// API
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

export default function CreateEditFlatTypePage() {
  const { themeStretch } = useSettings();
  const { id } = useParams(); // useParams use to get id of area on URL area/:id
  const { enqueueSnackbar } = useSnackbar();

  const [flatTypeDetail, setFlatTypeDetail] = useState('');
  const [status, setStatus] = useState(false);

  useEffect(() => {
    getData();
  }, [id, status]);

  const getData = async () => {
    try {
      const response = await axios.get(`flats/type/${id}`);
      setFlatTypeDetail(response.data.data);
      setStatus(response.data.data.Status);
    } catch (error) {
      if (error.status === 'Not Found') {
        setFlatTypeDetail('');
      }
      return console.error(error);
    }
  };

  const handleChange = async () => {
    try {
      const response = await axios.put(`flats/type/${id}/toggle-status`);
      enqueueSnackbar(response.data.message, { variant: 'success' });
      setStatus(!status);
    } catch (error) {
      console.log('error: ', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Page title={id ? 'Chỉnh sửa loại căn hộ' : 'Thêm loại căn hộ'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={id ? 'Chỉnh sửa loại căn hộ' : 'Thêm loại căn hộ'}
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Danh sách loại căn hộ', href: PATH_SUPERVISOR.setting.flatType },
            { name: id ? 'Chỉnh sửa loại căn hộ' : 'Thêm loại căn hộ' }
          ]}
        />
        {id ? (
          <EditFlatTypeForm handleChange={handleChange} flatTypeDetail={flatTypeDetail} flatTypeStatus={status} />
        ) : (
          <CreateFlatTypeForm />
        )}
      </Container>
    </Page>
  );
}
