import { motion } from 'framer-motion';
// material
import { styled, alpha } from '@material-ui/core/styles';
import { Button, Box, Container, Typography } from '@material-ui/core';
//
import { varFadeInDown, varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: 'black',
  padding: 50
}));
const ContentStyle = styled('div')(({ theme }) => ({
  width: 1000,
  height: 456,
  backgroundColor: '#3366FF',
  alignItems: 'center'
}));

// ----------------------------------------------------------------------

export default function LandingAdvertisement() {
  return (
    <RootStyle>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1
        }}
      >
        asdasds
      </Box>
    </RootStyle>
  );
}
