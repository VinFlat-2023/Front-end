// material
import { Container } from '@material-ui/core';
import useSettings from 'src/hooks/useSettings';
import { PATH_SUPERVISOR } from 'src/routes/paths';
import CreateContractForm from './components/CreateContractForm';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
// ----------------------------------------------------------------------

export default function CreateContractPage() {
  const { themeStretch } = useSettings();

  
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

        <CreateContractForm />
      </Container>
    </Page>
  );
}
