// material
import { styled } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
// components
import Page from '../components/Page';
import { AboutHero, AboutWhat, AboutVision, AboutTestimonials } from '../components/_external-pages/about';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

// ----------------------------------------------------------------------

export default function About() {
  return (
    <RootStyle title="Về chúng tôi | VinFlat">
      <AboutHero />
      <AboutWhat />
      <AboutVision />
      <Divider orientation="vertical" sx={{ my: 5, mx: 'auto', width: 1, height: 20 }} />
      {/* <AboutTeam /> */}
      <AboutTestimonials />
    </RootStyle>
  );
}
