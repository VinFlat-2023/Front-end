import { motion } from 'framer-motion';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
//
import { varWrapEnter, varFadeInRight, TextAnimate } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(/static/overlay.svg), url(/static/about/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10)
  }
}));

// ----------------------------------------------------------------------

export default function AboutHero() {
  return (
    <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
      <Container maxWidth="lg" sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <TextAnimate text="Chúng tôi" sx={{ color: 'primary.main' }} variants={varFadeInRight} />
          <br />
          <Box sx={{ display: 'inline-flex', color: 'common.white' }}>
            <TextAnimate text="là" sx={{ mr: 2 }} />
            <TextAnimate text="ai?" />
          </Box>

          <motion.div variants={varFadeInRight}>
            <Typography
              variant="h5"
              sx={{
                mt: 5,
                color: 'common.white',
                fontWeight: 'fontWeightMedium'
              }}
            >
              Hãy tìm hiểu về chúng tôi,
              <br /> để có lựa chọn phù hợp hơn
              <br /> cho việc thuê phòng của bạn.
            </Typography>
          </motion.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
