import { useEffect, useState } from 'react';
// material
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import { Icon } from '@iconify/react';
import { Box, Container, Stack, Tab, Tabs } from '@material-ui/core';
// redux
import { useSelector } from '../../../../../redux/store';
// routes
import { PATH_ADMIN } from '../../../../../routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import UserNewForm from 'src/components/_dashboard/user/UserNewForm';
import { getTabLabel } from 'src/utils/formatText';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
import Page from '../../../../../components/Page';
import { getProfile } from 'src/redux/slices/user';
import { useDispatch } from 'react-redux';
import { AccountChangePassword } from 'src/components/_dashboard/user/account';

// ----------------------------------------------------------------------

export default function EditAdminProfile() {
  const { themeStretch } = useSettings;
  const { myProfile } = useSelector((state) => state.user);
  const [currentTab, setCurrentTab] = useState('general');
  const dispatch = useDispatch();

  const ADMIN_TABS = [
    {
      value: 'general',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <UserNewForm isEdit={true} currentUser={myProfile} />
    },
    {
      value: 'change_password',
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <Page title="Hồ sơ cá nhân">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Hồ sơ cá nhân"
          links={[
            { name: 'Trang chủ', href: PATH_ADMIN.root },
            { name: 'Quản lý hồ sơ', href: PATH_ADMIN.admin_profile.home },
            { name: 'Chỉnh sửa hồ sơ' }
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
            {ADMIN_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={getTabLabel(tab.value)}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>

          {ADMIN_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>
      </Container>
    </Page>
  );
}
