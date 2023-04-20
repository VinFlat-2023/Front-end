import { useEffect } from 'react';
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
import CreateAreaForm from './components/CreateAreaForm';

// ----------------------------------------------------------------------

export default function AreaCreatePage() {
  const { themeStretch } = useSettings();


  return (
    <Page title={'Thêm thành viên mới'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Thêm thành viên mới'}
          links={[
            { name: 'Trang chủ', href: PATH_ADMIN.root },
            { name: 'Quản lý khu vực', href: PATH_ADMIN.area.listAreas },
            { name: 'Thêm khu vực' }
          ]}
        />

        <CreateAreaForm />
      </Container>
    </Page>
  );
}
