import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import roundArrowRightAlt from '@iconify/icons-ic/round-arrow-right-alt';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Box, Grid, Link, Paper, Rating, Container, Typography, useMediaQuery } from '@material-ui/core';
//
import { varFadeInUp, varFadeInLeft, MotionInView } from '../../animate';
import { MHidden } from '../../@material-extend';
import LandingGallery from '../../../components/_external-pages/landing/common/LandingGallery';

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    name: 'Vệ sinh tuyệt đối sạch sẽ'
    // rating: 5,
    // dateCreate: 'April 19, 2021',
    // content: `Excellent Work! Thanks a lot!`
  },
  {
    name: 'Duy trì tốt an ninh trật tự'
    // rating: 5,
    // dateCreate: 'April 19, 2021',
    // content: `It's a very good dashboard and we are really liking the product . We've done some things, like migrate to TS and implementing a react useContext api, to fit our job methodology but the product is one of the best in terms of design and application architecture. The team did a really good job.`
  },
  {
    name: 'Đầy đủ chỗ đậu xe máy'
    // rating: 5,
    // dateCreate: 'April 19, 2021',
    // content: `Customer support is realy fast and helpful the desgin of this theme is looks amazing also the code is very clean and readble realy good job !`
  },
  {
    name: 'Tiết kiệm chi phí'
    // rating: 5,
    // dateCreate: 'April 19, 2021',
    // content: `Amazing, really good code quality and gives you a lot of examples for implementations.`
  },
  {
    name: 'Sữa chữa nhanh chóng'
    // rating: 5,
    // dateCreate: 'April 19, 2021',
    // content: `Got a few questions after purchasing the product. The owner responded very fast and very helpfull. Overall the code is excellent and works very good. 5/5 stars!`
  },
  {
    name: 'Và nhiều tiện ích khác...'
    // rating: 5,
    // dateCreate: 'April 19, 2021',
    // content: `CEO of Codealy.io here. We’ve built a developer assessment platform that makes sense - tasks are based on git repositories and run in virtual machines. We automate the pain points - storing candidates code, running it and sharing test results with the whole team, remotely. Bought this template as we need to provide an awesome dashboard for our early customers. I am super happy with purchase. The code is just as good as the design. Thanks!`
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(10, 0),
  backgroundSize: 'cover',
  backgroundImage: `linear-gradient(to right, ${alpha(theme.palette.grey[900], 0.8)} , ${alpha(
    theme.palette.grey[900],
    0.8
  )}), url(/static/about/testimonials.jpg)`,
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    padding: 0,
    height: 840,
    overflow: 'hidden'
  }
}));

// ----------------------------------------------------------------------

TestimonialCard.propTypes = {
  testimonial: PropTypes.object
};

function TestimonialLink() {
  return <LandingGallery />;
}

function TestimonialCard({ testimonial }) {
  const { name } = testimonial;
  return (
    <Paper
      sx={{
        mt: 3,
        p: 3,
        color: 'common.white',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)', // Fix on Mobile
        bgcolor: (theme) => alpha(theme.palette.common.white, 0.04)
      }}
    >
      <Typography variant="body2" gutterBottom>
        {name}
      </Typography>
      {/* <Typography gutterBottom component="p" variant="caption" sx={{ color: 'grey.500' }}>
        {dateCreate}
      </Typography> */}
      {/* <Rating value={rating} readOnly size="small" /> */}
      {/* <Typography variant="body2" sx={{ mt: 1.5 }}>
        {content}
      </Typography> */}
    </Paper>
  );
}

export default function AboutTestimonials() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative', height: '100%' }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ height: '100%' }}
        >
          <Grid item xs={10} md={4}>
            <Box sx={{ maxWidth: { md: 360 } }}>
              <MotionInView variants={varFadeInUp}>
                <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
                  Vinflat2023
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography variant="h2" sx={{ mb: 3, color: 'common.white' }}>
                  Sự khác biệt <br />
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography sx={{ color: 'common.white' }}>
                  Không dừng lại ở việc "cho thuê - thu tiền", chúng tôi thật sự mong muốn được tạo ra không gian sống
                  tốt hơn và là hình mẫu cho việc đó.
                </Typography>
              </MotionInView>

              {/* <MHidden width="mdUp">
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <MotionInView variants={varFadeInUp}>
                    <TestimonialLink />
                  </MotionInView>
                </Box>
              </MHidden> */}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            lg={6}
            sx={{
              right: { md: 24 },
              position: { md: 'absolute' }
            }}
          >
            <Grid container spacing={isDesktop ? 3 : 0} alignItems="center">
              <Grid item xs={12} md={6}>
                {TESTIMONIALS.slice(0, 3).map((testimonial) => (
                  <MotionInView key={testimonial.name} variants={varFadeInUp}>
                    <TestimonialCard testimonial={testimonial} />
                  </MotionInView>
                ))}
              </Grid>

              <Grid item xs={12} md={6}>
                {TESTIMONIALS.slice(3, 6).map((testimonial) => (
                  <MotionInView key={testimonial.name} variants={varFadeInUp}>
                    <TestimonialCard testimonial={testimonial} />
                  </MotionInView>
                ))}
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </Container>
      
    </RootStyle>
  );
}
