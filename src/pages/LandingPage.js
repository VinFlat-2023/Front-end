// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  // LandingMinimal,
  // LandingDarkMode,
  // LandingThemeColor,
  // LandingPricingPlans,
  // LandingAdvertisement,
  // LandingCleanInterfaces,
  // LandingHugePackElements
} from '../components/_external-pages/landing';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));


const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="Trang chủ | VinFlat" id="move_top">
      <LandingHero />
      {/* <ContentStyle> */}
        {/* <LandingMinimal /> */}
        {/* <LandingHugePackElements /> */}
        {/* <LandingDarkMode />
        <LandingThemeColor />
        <LandingCleanInterfaces />
        <LandingPricingPlans />
        <LandingAdvertisement /> */}
      {/* </ContentStyle> */}
    </RootStyle>
  );
}
