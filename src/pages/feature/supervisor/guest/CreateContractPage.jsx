// material
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import {
  Box,
  Container,
  Stack,
  Tab,
  Tabs
} from '@material-ui/core';
import { useState } from 'react';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PATH_SUPERVISOR } from 'src/routes/paths';
import { getTabLabel } from 'src/utils/formatText';
import CreateContractForm from './components/CreateContractForm';
import { Icon } from '@iconify/react';
// ----------------------------------------------------------------------

export default function CreateContractPage() {
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('newUser');
  const handleChangeTab = (event, value) => {
    setCurrentTab(value);
  }

  const CONTRACT_TABS = [
    {
      value: 'newUser',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <CreateContractForm isNewUser={true}/>
    },
    {
      value: 'existsUser',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <CreateContractForm isNewUser={false}/>
    },
  ];

  return (
    <Page title={'Thông tin hợp đồng'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Thêm thành viên mới'}
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Quản lý hợp đồng', href: PATH_SUPERVISOR.guest.listContract },
            { name: 'Thông tin hợp đồng' }
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
            {CONTRACT_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={getTabLabel(tab.value)} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>

          {CONTRACT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>

      </Container>
    </Page>
  );
}
