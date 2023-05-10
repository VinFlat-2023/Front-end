import { Icon } from '@iconify/react';
import { useState } from 'react';
import ListIcon from '@iconify/icons-eva/list-outline';
import downloadIcon from '@iconify/icons-eva/download-outline';

// material
import { Card, Stack, Button, Container, Tab, Tabs, Box } from '@material-ui/core';
// routes
import { PATH_SUPERVISOR } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import ListRequestComponent from './components/requests/ListRequestComponent';
import ListRequestCancelComponent from './components/requests/ListRequestCancelComponent';
import { Padding } from '@material-ui/icons';
// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'all',
    label: 'Tất cả yêu cầu',
    icon: <Icon icon={ListIcon} width={20} height={20} />,
    component: <ListRequestComponent/>
  },
  {
    value: 'cancel',
    label: 'Yêu cầu đã hủy',
    icon: <Icon icon={ListIcon} width={20} height={20} />,
    component: <ListRequestCancelComponent/>
  }
];

// ----------------------------------------------------------------------

export default function ListRequestPage() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('all');

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="Danh sách yêu cầu">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách yêu cầu"
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Khách thuê', href: PATH_SUPERVISOR.guest.root },
            { name: 'Danh sách yêu cầu' }
          ]}
          action={<Button variant="contained" startIcon={<Icon icon={downloadIcon} />}></Button>}
        />

        <Card>
          <Stack spacing={5}>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChangeTab}
            >
              {TABS.map((tab) => (
                <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
              ))}
            </Tabs>

            {TABS.map((tab) => {
              const isMatched = tab.value === currentTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
