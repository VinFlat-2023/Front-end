// material
import { Button, Typography, TextField, Stack } from '@material-ui/core';
//
import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

export default function FaqsForm() {
  return (
    <Stack spacing={3}>
      <MotionInView variants={varFadeInUp}>
        <Typography variant="h4">Chưa tìm được sự trợ giúp phù hợp?</Typography>
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <TextField fullWidth label="Họ và Tên" />
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <TextField fullWidth label="Địa chỉ Email" />
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <TextField fullWidth label="Vấn đề" />
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <TextField fullWidth label="Nhập mô tả vấn đề của bạn ở đây." multiline rows={4} />
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <Button size="large" variant="contained">
          Đăng ký tư vấn ngay
        </Button>
      </MotionInView>
    </Stack>
  );
}
