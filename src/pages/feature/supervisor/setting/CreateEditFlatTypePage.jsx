import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
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
//
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

export default function CreateEditFlatTypePage() {
  const { themeStretch } = useSettings();
  const { id } = useParams(); // useParams use to get id of area on URL area/:id

  const [flatTypeDetail, setFlatTypeDetail] = useState('');

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    try {
      const data = await axios.get(`flats/type/${id}`);
      setFlatTypeDetail(data.data.data);
    } catch (error) {
      if (error.status === 'Not Found') {
        setFlatTypeDetail('');
      }
      return console.error(error);
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
        {id ? <EditFlatTypeForm flatTypeDetail={flatTypeDetail} /> : <CreateFlatTypeForm />}
      </Container>
    </Page>
  );
}
