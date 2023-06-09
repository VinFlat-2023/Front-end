import PropTypes from 'prop-types';
// material
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------
// chỉnh Logo bên góc trái => VinFlat
Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />    
        </g>
      </svg> */}

      <svg xmlns="http://www.w3.org/2000/svg" width="110%" height="110%" viewBox="0 0 512 512">
        <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill="#3366FF" stroke="none">
          <path
            d="M500 2500 l0 -2000 365 0 365 0 2 297 3 297 123 49 122 49 0 59 0 59
-48 -19 c-26 -11 -72 -29 -102 -41 -114 -46 -101 -49 -98 26 l3 66 120 48 120
48 3 60 3 60 -103 -43 c-162 -66 -148 -67 -148 8 l0 64 125 49 125 49 0 58 c0
31 -2 57 -5 57 -3 0 -56 -20 -117 -45 -62 -25 -116 -45 -121 -45 -4 0 -7 28
-5 62 l3 62 123 49 122 49 0 59 0 59 -47 -19 c-27 -11 -73 -29 -103 -41 -112
-45 -100 -48 -100 24 l0 64 190 76 c105 42 192 76 195 76 3 0 5 -389 5 -865
l0 -865 280 0 280 0 -2 827 -3 827 -220 101 -220 102 0 488 0 488 304 138
c167 77 307 139 312 139 5 0 9 -661 9 -1555 l0 -1555 260 0 260 0 2 1270 3
1270 220 -103 220 -103 3 -63 3 -62 -30 16 c-17 8 -65 31 -106 50 l-75 34 0
-60 0 -60 105 -49 105 -49 0 -60 0 -60 -105 49 -105 49 0 -60 0 -60 105 -49
105 -50 0 -59 0 -60 -75 34 c-41 19 -89 42 -105 50 l-30 16 0 -61 0 -61 105
-50 105 -49 0 -174 0 -174 -162 -65 -163 -65 -3 -566 -2 -566 220 0 220 0 0
595 c0 506 2 596 14 601 8 3 81 -25 163 -63 l148 -69 3 -67 c2 -37 1 -67 -1
-67 -3 0 -48 20 -101 45 l-96 44 0 -60 0 -60 100 -46 100 -46 0 -64 c0 -34 -4
-63 -9 -63 -5 0 -48 18 -96 40 -48 22 -89 40 -91 40 -2 0 -4 -26 -4 -58 l0
-59 100 -46 100 -46 0 -66 c0 -36 -2 -65 -4 -65 -3 0 -48 20 -100 44 l-96 45
0 -60 0 -61 100 -46 100 -46 0 -148 0 -148 365 0 365 0 0 2000 0 2000 -2000 0
-2000 0 0 -2000z m3885 0 l0 -1885 -252 -3 -253 -2 -2 512 -3 512 -200 93
c-113 52 -208 90 -217 87 -17 -5 -18 27 -20 542 l-3 548 -165 76 c-91 43 -242
113 -337 158 l-172 80 -138 -85 c-75 -47 -143 -88 -150 -90 -10 -4 -13 68 -13
366 0 204 -2 371 -4 371 -2 0 -190 -85 -417 -190 l-414 -189 -3 -525 -2 -524
-248 -99 -247 -99 -3 -772 -2 -772 -253 2 -252 3 -3 1875 c-1 1031 0 1881 3
1888 3 10 386 12 1887 10 l1883 -3 0 -1885z"
          />
          <path
            d="M2168 3393 l-58 -26 0 -521 0 -522 56 -27 c31 -16 58 -26 60 -24 2 2
3 261 2 575 l-3 571 -57 -26z"
          />
          <path
            d="M1903 3272 l-53 -26 0 -402 0 -403 56 -25 c31 -14 58 -26 60 -26 2 0
4 205 4 455 0 250 -3 455 -7 454 -5 0 -32 -12 -60 -27z"
          />
        </g>
      </svg>
    </Box>
  );
}
