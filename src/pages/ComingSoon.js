// import { Icon } from '@iconify/react';
// import twitterFill from '@iconify/icons-eva/twitter-fill';
// import facebookFill from '@iconify/icons-eva/facebook-fill';
// import linkedinFill from '@iconify/icons-eva/linkedin-fill';
// import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Button, Container, Typography} from '@material-ui/core';
// hooks
import useCountdown from '../hooks/useCountdown';
// components
// import { MIconButton } from '../components/@material-extend';
import Page from '../components/Page';
import { ComingSoonIllustration } from '../assets';
import { Link as RouterLink } from 'react-router-dom';
// ----------------------------------------------------------------------

// const SOCIALS = [
//   {
//     name: 'Facebook',
//     icon: <Icon icon={facebookFill} width={24} height={24} color="#1877F2" />
//   },
//   {
//     name: 'Instagram',
//     icon: <Icon icon={instagramFilled} width={24} height={24} color="#D7336D" />
//   },
//   {
//     name: 'Linkedin',
//     icon: <Icon icon={linkedinFill} width={24} height={24} color="#006097" />
//   },
//   {
//     name: 'Twitter',
//     icon: <Icon icon={twitterFill} width={24} height={24} color="#1C9CEA" />
//   }
// ];

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

const CountdownStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center'
});

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 2.5)
  }
}));

// ----------------------------------------------------------------------

export default function ComingSoon() {
  const countdown = useCountdown(new Date('07/07/2022 21:30'));

  return (
    <RootStyle title="Sắp ra mắt | VinFlat">
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Coming Soon!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Chúng tôi hiện đang làm việc chăm chỉ trang này sẽ sớm được hoàn thành!
          </Typography>

          <ComingSoonIllustration sx={{ my: 10, height: 240 }} />

          {/* <Box sx={{ textAlign: 'center', '& > *': { mx: 1 } }}>
            {SOCIALS.map((social) => (
              <Tooltip key={social.name} title={social.name}>
                <MIconButton>{social.icon}</MIconButton>
              </Tooltip>
            ))}
          </Box> */}
          <Button variant="contained" size="large" component={RouterLink} to="/">
            Trở về trang chủ
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
