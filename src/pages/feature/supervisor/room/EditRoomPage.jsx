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
// ----------------------------------------------------------------------

export default function EditRoomPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const { currentRoom, currentFlatId } = useSelector(state => state.room);
  const { currentFlatName } = useSelector(state => state.flat);

  console.log("currentFlatId",currentFlatId,currentFlatName)
  useEffect(() => {
    dispatch(getRoomById(id));
  }, []);

  useEffect(()=>{
    dispatch(getFlatById(currentFlatId));
  },[currentFlatId])
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

        <CreateRoomForm currentRoom={{...currentRoom, flatName: currentFlatName}}  />

      </Container>
    </Page>
  );
}
