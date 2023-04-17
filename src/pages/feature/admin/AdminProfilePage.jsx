import { useEffect, useState } from 'react';
import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container, Tab, Box, Tabs, Stack } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
// import { getUserList } from '..././../redux/slices/user';
// routes
import { PATH_ADMIN } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import UserNewForm from '../../../components/_dashboard/user/UserNewForm';
import { getProfile } from '../../../redux/slices/user';

// ----------------------------------------------------------------------

export default function AdminProfilePage() {
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
            { name: 'Trang chủ', href: PATH_ADMIN.root },
            { name: 'Quản lý tài khoản', href: PATH_ADMIN.account.accounts },
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
