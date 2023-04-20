// material
import { Container, Grid, Stack } from '@material-ui/core';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import {
  AppWelcome,
  AppWidgets1,
  AppWidgets2,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppTotalDownloads,
  AppTotalInstalled,
  AppCurrentDownload,
  AppTotalActiveUsers,
  AppTopInstalledCountries
} from '../../../../components/_dashboard/general-app';

// ----------------------------------------------------------------------

export default function SupervisorCreateUserPage() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="VinFlat | Tạo mới tài khoản">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={3}>
            <AppTotalActiveUsers />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppTotalInstalled />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppTotalInstalled />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppTotalDownloads />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
