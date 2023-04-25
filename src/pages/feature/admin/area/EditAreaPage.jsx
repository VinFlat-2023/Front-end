import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getUserList } from '../../../../redux/slices/user';
// routes
import { PATH_ADMIN } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import EditAreaForm from './components/EditAreaForm';
// 
import axios from '../../../../utils/axios'

// ----------------------------------------------------------------------

export default function AreaEditPage() {
  const { themeStretch } = useSettings();
  const { id } = useParams(); // useParams use to get id of area on URL area/:id
  console.log('id area: ', id);
  const [areaDetail, setAreaDetail] = useState('');

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    try {
      const data = await axios.get(`areas/${id}`);
      setAreaDetail(data.data.data);
      
    } catch (error) {
      if (error.status === 'Not Found') {
        setAreaDetail('');
      }
      return console.error(error);
    }
  };


  return (
    <Page title={'Thêm thành viên mới'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Thêm thành viên mới'}
          links={[
            { name: 'Trang chủ', href: PATH_ADMIN.root },
            { name: 'Quản lý khu vực', href: PATH_ADMIN.area.listAreas },
            { name: 'Chỉnh sửa khu vực' }
          ]}
        />

        <EditAreaForm areaDetail={areaDetail} />
      </Container>
    </Page>
  );
}
