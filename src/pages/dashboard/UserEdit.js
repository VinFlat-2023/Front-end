import { useEffect, useState } from 'react';
import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container, Tab, Box, Tabs, Stack } from '@material-ui/core';
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
import { getProfile } from '../../redux/slices/user';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import account from '@iconify/icons-ic/account-box';
import { Icon } from '@iconify/react';
import { AccountChangePassword } from 'src/components/_dashboard/user/account';
import { getAccountTabLabel } from 'src/utils/formatText';

// ----------------------------------------------------------------------

export default function UserEdit() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { name } = useParams();
  const currentUserId = window.localStorage.getItem('userId');
  const { userList } = useSelector((state) => state.user);
  console.log(userList)
                      
  const [currentTab, setCurrentTab] = useState('general');
  const [currentUser, setCurrentUser] = useState();

  useEffect(()=>{
    setCurrentUser(userList.find((user) => user.EmployeeId == currentUserId));
  },[userList])

  console.log(currentUser, currentUserId)
  const USER_TABS = [
    {
      value: 'general',
      icon: <Icon icon={account} width={20} height={20} />,
      component: <UserNewForm isEdit={true} currentUser={currentUser} />
    },
    {
      value: 'changePassword',
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />
    },
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <Page title="Chỉnh sửa tài khoản">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chỉnh sửa tài khoản"
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'Quản lý tài khoản', href: PATH_DASHBOARD.account.root },
            { name: 'Chỉnh sửa tài khoản' }
          ]}
        />

        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {USER_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={getAccountTabLabel(tab.value)} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>

          {USER_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>
      </Container>
    </Page>
  );
}
