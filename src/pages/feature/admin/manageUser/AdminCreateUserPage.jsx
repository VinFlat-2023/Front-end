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
import UserNewForm from '../../../../components/_dashboard/user/UserNewForm';
import { useSnackbar } from 'notistack5';
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { userList } = useSelector((state) => state.user);
  const isEdit = pathname.includes('edit');
  const currentUser = userList?.find((user) => paramCase(user.Username) === name);
  const { enqueueSnackbar } = useSnackbar();
  const [building, setBuilding] = useState([]);

  const getAllBuilding = async () => {
    try {
      const response = await axios.get('buildings/list');
      setBuilding(response.data.data);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  
  useEffect(() => {
    dispatch(getUserList());
    getAllBuilding();
  }, [dispatch]);

  return (
    <Page title={'Thêm thành viên mới'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Thêm thành viên mới'}
          links={[
            { name: 'Trang chủ', href: PATH_ADMIN.root },
            { name: 'Quản lý tài khoản', href: PATH_ADMIN.account.accounts },
            { name: 'Thêm tài khoản' }
          ]}
        />

        <UserNewForm isEdit={isEdit} currentUser={currentUser} building ={building} />
      </Container>
    </Page>
  );
}
