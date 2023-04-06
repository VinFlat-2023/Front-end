// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Box, Grid, Card, Container, Typography, useMediaQuery } from '@material-ui/core';
import useSettings from '../../../hooks/useSettings';
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';
import LandingGallery from './common/LandingGallery';
import LandingCarousel from './common/LandingCarousel';
//
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

const CARDS = [
  {
    id: 1,
    title: 'Quận 9',
    imageUrl: 'https://www.nhatrosachse.com/images/desk/quan-9-min.png'
  },
  {
    id: 2,
    title: 'Thủ Đức',
    imageUrl: 'https://www.nhatrosachse.com/images/desk/thu-duc-min.png'
  },
  {
    id: 3,
    title: 'Bình Tân',
    imageUrl: 'https://www.nhatrosachse.com/images/desk/tan-binh-min.png'
  },
  {
    id: 4,
    title: 'Khu vực khác',
    imageUrl: 'https://www.nhatrosachse.com/images/desk/khu-vuc-khac-min.png'
  }
];

const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is product 1',
    image: 'https://via.placeholder.com/300x200.png?text=Product+1'
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is product 2',
    image: 'https://via.placeholder.com/300x200.png?text=Product+2'
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is product 3',
    image: 'https://via.placeholder.com/300x200.png?text=Product+3'
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'This is product 3',
    image: 'https://via.placeholder.com/300x200.png?text=Product+3'
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'This is product 3',
    image: 'https://via.placeholder.com/300x200.png?text=Product+3'
  },
  {
    id: 6,
    name: 'Product 6',
    description: 'This is product 3',
    image: 'https://via.placeholder.com/300x200.png?text=Product+3'
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

const ContainerStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const data = await axios.get('https://vinflat-webapp.azurewebsites.net/api/buildings/order/all');
      setData(data.data.data);
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
            <LandingGallery gallery={CARDS} />
          </MotionInView>
          <ContainerStyle>
            <MotionInView variants={varFadeInDown}>
              <LandingCarousel products={data} />
            </MotionInView>
          </ContainerStyle>
        </Box>
      </Container>
    </RootStyle>
  );
}
