import { useEffect, useState } from 'react';
// material
import { Container, Tab, Box, Tabs, Stack } from '@material-ui/core';
import { Icon } from '@iconify/react';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
// routes
import { PATH_ADMIN } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import Page from '../../../../components/Page';
import { getProfile } from '../../../../redux/slices/user';
import ViewProfile from './components/ViewProfile';
import { getTabLabel } from 'src/utils/formatText';

// ----------------------------------------------------------------------

export default function SupervisorProfilePage() {
  const { themeStretch } = useSettings();
  const { myProfile } = useSelector((state) => state.user);
  const [currentTab, setCurrentTab] = useState('general');
  const dispatch = useDispatch();

  const ADMIN_TABS = [
    {
      value: 'general',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <ViewProfile currentUser={myProfile} />
    },
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
            { name: 'Hồ sơ cá nhân' }
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
              <Tab disableRipple key={tab.value} label={getTabLabel(tab.value)} icon={tab.icon} value={tab.value} />
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

