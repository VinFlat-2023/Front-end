// material
import {
  Container
} from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PATH_SUPERVISOR } from 'src/routes/paths';
import CreateRoomForm from './components/CreateRoomForm';
import CreateFlatForm from './components/CreateFlatForm';
// ----------------------------------------------------------------------

export default function CreateRoomPage() {
  const { themeStretch } = useSettings();


  return (
    <Page title={'Thêm căn hộ'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Thêm căn hộ'}
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Danh sách căn hộ', href: PATH_SUPERVISOR.room.listFlat },
            { name: 'Thêm căn hộ' }
          ]}
        />

        <CreateFlatForm />

      </Container>
    </Page>
  );
}
