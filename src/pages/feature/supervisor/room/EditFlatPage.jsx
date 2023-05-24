// material
import {
  Container
} from '@material-ui/core';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { getRoomById } from 'src/redux/slices/room';
import { useDispatch, useSelector } from 'src/redux/store';
import { PATH_SUPERVISOR } from 'src/routes/paths';
import CreateRoomForm from './components/CreateRoomForm';
import { getFlatById } from 'src/redux/slices/flat';
import CreateFlatForm from './components/CreateFlatForm';
// ----------------------------------------------------------------------

export default function EditFlatPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const { currentFlat } = useSelector(state => state.flat);

  useEffect(() => {
    dispatch(getFlatById(id));
  }, []);

  return (
    <Page title={'Cập nhật tình trạng phòng'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Cập nhật tình trạng phòng'}
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Phòng', href: PATH_SUPERVISOR.room.listRoom },
            { name: 'Cập nhật tình trạng phòng' }
          ]}
        />

        <CreateFlatForm currentFlat={currentFlat} isEditPage ={true} />

      </Container>
    </Page>
  );
}
