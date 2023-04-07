
// material
import { styled, alpha } from '@material-ui/core/styles';
import {
  Link,
  Card,
  Grid,
  Typography
} from '@material-ui/core';
import ProductCard from './common/ProductCard.jsx';
import axios from '../../../utils/axios';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
//
import { MotionInView, varFadeInUp } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundImage:
    theme.palette.mode === 'light'
      ? `linear-gradient(180deg, ${theme.palette.grey[0]} 0%, ${alpha(theme.palette.grey[0], 0)} 100%)`
      : 'none'
}));

// ----------------------------------------------------------------------

export default function LandingThemeColor() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const data = await axios.get('buildings/spare-slot');
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
      <Card
        sx={{
          p: 3,
          borderRadius: 1,
          color: 'primary.main',
          bgcolor: `primary.grey[0]`
        }}
      >
        <MotionInView variants={varFadeInUp}>
          <Typography variant="h4" sx={{ mt: 1, p: 1, textAlign: 'left', color: 'black' }}>
            Ký túc xá <strong style={{ color: '#3366FF' }}>đang hoạt động</strong>
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, p: 1, textAlign: 'left', color: 'black' }}>
            Đáp ứng mọi nhu cầu của bạn
          </Typography>
        </MotionInView>
        <Grid container spacing={3}>
          {data.map((item) => (
            <Grid key={item.BuildingId} item xs={12} sm={6} md={3}>
              <ProductCard key={item.BuildingId} item={item} />
            </Grid>
          ))}
        </Grid>
        <Typography variant="subtitle1" sx={{ mt: 1, p: 1, textAlign: 'center', color: 'black' }}>
          <Link
            sx={{
              ml: 15,
              fontSize: 20,
              fontheight: 44,
              fontFamily: 'Public Sans',
              color: 'black',
              '&:hover': {
                color: '#3366FF'
              }
            }}
            component={RouterLink}
            to="#"
            underline="none"
          >
            Xem tất cả
          </Link>
        </Typography>
      </Card>
    </RootStyle>
  );
}
