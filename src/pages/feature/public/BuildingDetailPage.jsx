import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clockFill from '@iconify/icons-eva/clock-fill';
import roundVerified from '@iconify/icons-ic/round-verified';
import roundVerifiedUser from '@iconify/icons-ic/round-verified-user';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Card, Grid, Skeleton, Container, Typography } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import BuildingDetailsCarousel from './common/BuildingDetailCarosel';
import BuildingDetailsSumary from './common/BuildingDetailSumary';
import { varFadeInUp, varFadeInRight, MotionInView } from '../../../components/animate';
// API
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={7}>
      <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
    </Grid>
    <Grid item xs={12} md={6} lg={5}>
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" height={240} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </Grid>
  </Grid>
);

export default function BuildingDetailsPage() {
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const [detailBuilding, setDetailBuilding] = useState('');

  useEffect(() => {
    getData(id);
  }, [id]);

  const getData = async (buildingID) => {
    try {
      const rs = await axios.get(`buildings/${buildingID}`);
      setDetailBuilding(rs.data.data);
    } catch (error) {
      if (error.status === 'Not Found') {
        setDetailBuilding('');
      }
      return console.error(error);
    }
  };

  return (
    <RootStyle title="Tòa nhà">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {detailBuilding && (
          <>
            <Grid container>
              <Grid item xs={12} md={6} lg={7}>
                <MotionInView variants={varFadeInUp}>
                  <BuildingDetailsCarousel building={detailBuilding} />
                </MotionInView>
              </Grid>

              <Grid item xs={12} md={6} lg={5}>
                <MotionInView variants={varFadeInRight}>
                  <BuildingDetailsSumary building={detailBuilding} />
                </MotionInView>
              </Grid>
            </Grid>
          </>
        )}

        {!detailBuilding && SkeletonLoad}

        {!detailBuilding && <Typography variant="h6">404 Product not found</Typography>}
      </Container>
    </RootStyle>
  );
}
