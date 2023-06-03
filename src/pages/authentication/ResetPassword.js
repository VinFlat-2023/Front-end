import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { ResetPasswordForm } from '../../components/authentication/reset-password';
//
import axios from '../../utils/axios';
import { SentIcon } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const resetPassword = async () => {
    try {
      const url = 'auth/reset-password';
      await axios.post(url, { registeredEmail: email });
    } catch (error) {}
  };
  const onResetPassword = () => {
    // resetPassword(email);
    setSent(true);
  };
  return (
    <RootStyle title="Đặt lại mật khẩu | VinFlat">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant="h3" paragraph>
                Bạn quên mật khẩu?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Vui lòng nhập địa chỉ email được liên kết với tài khoản của bạn và quản trị viên hệ thống sẽ liên hệ với
                bạn để đặt lại mật khẩu.
              </Typography>

              <ResetPasswordForm
                onSent={() => {
                  onResetPassword();
                }}
                onGetEmail={(value) => setEmail(value)}
              />

              <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
                Trở lại
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant="h3" gutterBottom>
                Yêu cầu gửi thành công
              </Typography>
              <Typography>
                Mật khẩu mới đã được gửi tới người dùng &nbsp;
                <strong>{email}</strong>
                <br />
                sau khi thông tin xác thực. Vui lòng kiểm tra email của bạn.
              </Typography>

              <Button size="large" variant="contained" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 5 }}>
                Trở lại
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
