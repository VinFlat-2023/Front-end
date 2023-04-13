// material
import { Box, Container, Typography, Grid } from '@material-ui/core';
//
import { varFadeInUp, varFadeIn, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box
        sx={{
          mb: 10,
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <img src="/static/about/vision.jpg" alt="about-vision" />

        <Box
          sx={{
            bottom: { xs: 44, md: 180 },
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'center'
          }}
        >
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h4"
              sx={{
                color: (theme) => (theme.palette.mode === 'dark' ? 'text.primary' : 'common.white')
              }}
            >
              Trở thành công ty chuyên nghiệp, tiên phong trong lĩnh vực<br /> khai thác
              phòng ký túc xá cho thuê ở phân khúcgiá bình dân,<br /> vươn lên dẫn đầu thị trường trong lĩnh vực:
              <br />
              <br />
              1. Mở rộng số lượng phòng cho thuê.<br />
              2. Thương hiệu uy tín.<br />
              3. Sự tin tưởng, lựa chọn hàng đầu của khách hàng<br /> & chủ
              nhà, căn hộ cho thuê.
            </Typography>
          </MotionInView>
        </Box>
      </Box>

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h3" sx={{ textAlign: 'center' }}>
              Mục tiêu phát triển
            </Typography>
          </MotionInView>
        </Grid>
      </Grid>
    </Container>
  );
}
