import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UserNewForm from '../../components/_dashboard/user/UserNewForm';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { userList } = useSelector((state) => state.user);
  const isEdit = pathname.includes('edit');
  const currentUser = userList?.find((user) => paramCase(user.Username) === name);
  
  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  return (
    <Page title={'Thêm thành viên mới'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Thêm thành viên mới'}
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'Quản lý tài khoản', href: PATH_DASHBOARD.account.root },
            { name: 'Thêm tài khoản' }
          ]}
        />

        <UserNewForm isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </Page>
  );
}
