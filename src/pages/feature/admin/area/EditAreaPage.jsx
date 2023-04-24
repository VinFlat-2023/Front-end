import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
// routes
import { PATH_ADMIN } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import Page from '../../../../components/Page';
import EditAreaForm from './components/EditAreaForm';
// 
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

export default function AreaEditPage() {
  const { themeStretch } = useSettings();
  const { id } = useParams(); // useParams use to get id of area on URL area/:id
  const [areaDetail, setAreaDetail] = useState('');

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    try {
      const data = await axios.get(`areas/${id}`);
      setAreaDetail(data.data.data);
      console.log('data area',data.data.data )
    } catch (error) {
      if (error.status === 'Not Found') {
        setAreaDetail('');
      }
      return console.error(error);
    }
  };


  return (
    <Page title={'Chỉnh sửa thông tin khu vực'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Chỉnh sửa thông tin khu vực'}
          links={[
            { name: 'Trang chủ', href: PATH_ADMIN.root },
            { name: 'Quản lý khu vực', href: PATH_ADMIN.area.listAreas },
            { name: 'Chỉnh sửa thông tin khu vục' }
          ]}
        />

        <EditAreaForm areaDetail={areaDetail} />
      </Container>
    </Page>
  );
}
