import { motion } from 'framer-motion';
// material
import { styled, alpha } from '@material-ui/core/styles';
import { Card, Box, Stack, Typography, Grid } from '@material-ui/core';

//
import { varFadeInDown, varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: 'black',
  padding: 50
}));

// ----------------------------------------------------------------------

const supportAgent = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 20 20"
    height="100px"
    viewBox="0 0 20 20"
    width="100px"
    fill="#ffffff"
  >
    <g>
      <rect fill="none" height="50" width="50" x="0" />
    </g>
    <g>
      <g>
        <path d="M10,6C9.32,6,6.12,6.51,6.01,9.88c1.72-0.4,3.06-1.77,3.4-3.51c0.53,1.15,1.96,2.8,4.43,2.6C13.39,7.26,11.85,6,10,6z" />
        <circle cx="7.5" cy="10.75" r=".75" />
        <circle cx="12.5" cy="10.75" r=".75" />
        <path d="M16,10c0-3.31-2.69-6-6-6s-6,2.69-6,6c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1h1v-4c0-2.76,2.24-5,5-5s5,2.24,5,5v5H9v1h6 c0.55,0,1-0.45,1-1v-1c0.55,0,1-0.45,1-1v-2C17,10.45,16.55,10,16,10z" />
      </g>
    </g>
  </svg>
);

const fingerprint = (
  <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 0 24 24" width="100px" fill="#ffffff">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39s-4.66 1.97-4.66 4.39c0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94s3.08 1.32 3.08 2.94c0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z" />
  </svg>
);
const videocam = (
  <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 0 24 24" width="100px" fill="#ffffff">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M15 8v8H5V8h10m1-2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4V7c0-.55-.45-1-1-1z" />
  </svg>
);
const wifi = (
  <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 0 24 24" width="100px" fill="#ffffff">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M15.9 5c-.17 0-.32.09-.41.23l-.07.15-5.18 11.65c-.16.29-.26.61-.26.96 0 1.11.9 2.01 2.01 2.01.96 0 1.77-.68 1.96-1.59l.01-.03L16.4 5.5c0-.28-.22-.5-.5-.5zM1 9l2 2c2.88-2.88 6.79-4.08 10.53-3.62l1.19-2.68C9.89 3.84 4.74 5.27 1 9zm20 2l2-2c-1.64-1.64-3.55-2.82-5.59-3.57l-.53 2.82c1.5.62 2.9 1.53 4.12 2.75zm-4 4l2-2c-.8-.8-1.7-1.42-2.66-1.89l-.55 2.92c.42.27.83.59 1.21.97zM5 13l2 2c1.13-1.13 2.56-1.79 4.03-2l1.28-2.88c-2.63-.08-5.3.87-7.31 2.88z" />
  </svg>
);
const handyman = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="100px"
    viewBox="0 0 24 24"
    width="100px"
    fill="#ffffff"
  >
    <g>
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <g>
        <g>
          <path d="M21.67,18.17l-5.3-5.3h-0.99l-2.54,2.54v0.99l5.3,5.3c0.39,0.39,1.02,0.39,1.41,0l2.12-2.12 C22.06,19.2,22.06,18.56,21.67,18.17z M18.84,19.59l-4.24-4.24l0.71-0.71l4.24,4.24L18.84,19.59z" />
        </g>
        <g>
          <path d="M17.34,10.19l1.41-1.41l2.12,2.12c1.17-1.17,1.17-3.07,0-4.24l-3.54-3.54l-1.41,1.41V1.71L15.22,1l-3.54,3.54l0.71,0.71 h2.83l-1.41,1.41l1.06,1.06l-2.89,2.89L7.85,6.48V5.06L4.83,2.04L2,4.87l3.03,3.03h1.41l4.13,4.13l-0.85,0.85H7.6l-5.3,5.3 c-0.39,0.39-0.39,1.02,0,1.41l2.12,2.12c0.39,0.39,1.02,0.39,1.41,0l5.3-5.3v-2.12l5.15-5.15L17.34,10.19z M9.36,15.34 l-4.24,4.24l-0.71-0.71l4.24-4.24l0,0L9.36,15.34L9.36,15.34z" />
        </g>
      </g>
    </g>
  </svg>
);
const clean = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="100px"
    viewBox="0 0 24 24"
    width="100px"
    fill="#ffffff"
  >
    <g>
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <g>
        <path d="M16,11h-1V3c0-1.1-0.9-2-2-2h-2C9.9,1,9,1.9,9,3v8H8c-2.76,0-5,2.24-5,5v7h18v-7C21,13.24,18.76,11,16,11z M11,3h2v8h-2V3 z M19,21h-2v-3c0-0.55-0.45-1-1-1s-1,0.45-1,1v3h-2v-3c0-0.55-0.45-1-1-1s-1,0.45-1,1v3H9v-3c0-0.55-0.45-1-1-1s-1,0.45-1,1v3H5 v-5c0-1.65,1.35-3,3-3h8c1.65,0,3,1.35,3,3V21z" />
      </g>
    </g>
  </svg>
);
// ----------------------------------------------------------------------
const Advertisements = [
  {
    id: 1,
    image: supportAgent,
    name: 'Nhân viên trực 24/7'
  },
  {
    id: 2,
    image: fingerprint,
    name: 'Khóa cổng vân tay'
  },
  {
    id: 3,
    image: videocam,
    name: 'Camera an ninh'
  },
  {
    id: 4,
    image: wifi,
    name: 'Wifi tốc độ cao'
  },
  {
    id: 5,
    image: handyman,
    name: 'Sửa chữa nhanh'
  },
  {
    id: 6,
    image: clean,
    name: 'Vệ sinh hằng ngày'
  }
];
export default function LandingAdvertisement() {
  return (
    <RootStyle>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: '#3366FF',
          borderRadius: 1
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h3" sx={{ mt: 1, p: 1, textAlign: 'center', color: 'white' }}>
            Tiện ích chung
          </Typography>

          <Stack direction="row" spacing={10}>
            {Advertisements.map((item) => (
              <>
                <MotionInView variants={varFadeInUp}>
                  <Typography variant="subtitle2" sx={{ mt: 1, p: 1, textAlign: 'center', color: 'white' }}>
                    {item.image}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mt: 1,
                      p: 1,
                      textAlign: 'center',
                      color: 'white'
                    }}
                  >
                    {item.name}
                  </Typography>
                </MotionInView>
              </>
            ))}
          </Stack>
        </Stack>
      </Box>
    </RootStyle>
  );
}
