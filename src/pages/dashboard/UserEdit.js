import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Container, Stack } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_ADMIN, PATH_DASHBOARD, PATH_SUPERVISOR } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import UserNewForm from '../../components/_dashboard/user/UserNewForm';
import { getProfile } from '../../redux/slices/user';

// ----------------------------------------------------------------------

export default function UserEdit() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { myProfile, userList } = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    setCurrentUser(id ? userList.find((user) => user.EmployeeId == id) : myProfile);
  }, [myProfile]);


  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <Page title="Chỉnh sửa tài khoản">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chỉnh sửa tài khoản"
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Quản lý tài khoản', href: PATH_DASHBOARD.account.root },
            { name: 'Chỉnh sửa tài khoản' }
          ]}
        />

        <Stack spacing={5}>
          <UserNewForm isEdit={true} currentUser={currentUser} />
        </Stack>
      </Container>
    </Page>
  );
}
