// material
import { styled } from '@material-ui/core/styles';
import { Box, Grid, Card, Container, Typography } from '@material-ui/core';
import axios from '../../../utils/axios';
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';
import LandingGallery from './common/LandingGallery';
import LandingCarousel from './common/LandingCarousel';
//
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------



const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(5)
  }
}));

const ContainerStyle = styled('div')(({ theme }) => ({}));

// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
  const [data, setData] = useState([]);
  const [totleSpareRoom, setTotalSpareRoom] = useState(0);
  const fetchData = async () => {
    try {
      const data = await axios.get('buildings?SpareSlots=true');
      setData(data.data.data);
      setTotalSpareRoom(data.data.totalCount);
    } catch (error) {
      return console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 25 } }}>
          <MotionInView variants={varFadeInUp}>
            <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary', textAlign: 'center' }}>
              @VinFlat2023
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <LandingGallery />
          </MotionInView>
        </Box>
      </Container>
      <MotionInView variants={varFadeInDown}>
        <ContainerStyle>
          <LandingCarousel products={data} totleSpareRoom={totleSpareRoom} />
        </ContainerStyle>
      </MotionInView>
    </RootStyle>
  );
}
