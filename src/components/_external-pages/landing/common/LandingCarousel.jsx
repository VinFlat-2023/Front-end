import React from 'react';
import Slider from 'react-slick';
import { Box, Grid, Card, Typography, CardContent } from '@material-ui/core';
import { FOUNDATION_LIST } from './PathConfig';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from './ProductCard';
import './styles/LandingCarousel.css';

const Carousel = ({ products }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    nextArrow: <ArrowForward />,
    prevArrow: <ArrowBack />,
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
    <div className="carousel-container">
      <Slider {...settings}>
        {products.map((item) => (
          <ProductCard key={item.BuildingId} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
