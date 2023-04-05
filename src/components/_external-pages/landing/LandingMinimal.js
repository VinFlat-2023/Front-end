// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Box, Grid, Card, Container, Typography, useMediaQuery } from '@material-ui/core';
import useSettings from '../../../hooks/useSettings';
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';
import LandingGallery from './common/LandingGallery';

// ----------------------------------------------------------------------

const CARDS = [
  {
    id: 1,
    title: 'Quận 9',
    imageUrl:
      'https://www.nhatrosachse.com/images/desk/quan-9-min.png'
  },
  {
    id: 2,
    title: 'Thủ Đức',
    imageUrl:
      'https://www.nhatrosachse.com/images/desk/thu-duc-min.png'
  },
  {
    id: 3,
    title: 'Bình Tân',
    imageUrl:
      'https://www.nhatrosachse.com/images/desk/tan-binh-min.png'
  },
  {
    id: 4,
    title: 'Khu vực khác',
    imageUrl:
      'https://www.nhatrosachse.com/images/desk/khu-vuc-khac-min.png'
  }
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    maxWidth: 380,
    minHeight: 440,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(10, 5, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: -40 }
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`
        }
      }
    }
  };
});

const CardIconStyle = styled('img')(({ theme }) => ({
  width: 40,
  height: 40,
  margin: 'auto',
  marginBottom: theme.spacing(10),
  filter: shadowIcon(theme.palette.primary.main)
}));

// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { themeStretch } = useSettings();

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
        </Box>
      </Container>
    </RootStyle>
  );
}
