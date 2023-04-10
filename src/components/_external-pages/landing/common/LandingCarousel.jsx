import React from 'react';
import Slider from 'react-slick';
import { Card, Typography, Link } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from './ProductCard';
import './styles/LandingCarousel.css';
import { Link as RouterLink } from 'react-router-dom';

const Carousel = ({ products, totleSpareRoom }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 1,
        color: 'primary.main',
        bgcolor: `primary.grey[0]`
      }}
    >
      <Typography variant="h4" sx={{ mt: 1, p: 1, textAlign: 'left', color: 'black' }}>
        Có <strong style={{ color: '#3366FF' }}>{totleSpareRoom} phòng </strong> đang trống
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

      <Slider {...settings}>
        {products.map((item) => (
          <ProductCard key={item.BuildingId} item={item} />
        ))}
      </Slider>
    </Card>
  );
};

export default Carousel;
