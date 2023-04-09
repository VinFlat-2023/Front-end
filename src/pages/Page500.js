import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
// material
import { Box, Button, Typography, Container } from '@material-ui/core';
// components
import Page from '../components/Page';
import { SeverErrorIllustration } from '../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <RootStyle title="Lỗi hệ thống | VinFlat">
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Đã xảy ra lỗi, xin thử lại sau.
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>There was an error, please try again later.</Typography>

          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Trở về trang chủ
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
