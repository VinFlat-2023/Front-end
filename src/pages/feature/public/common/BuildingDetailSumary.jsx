import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
import Markdown from '../../../../components/Markdown';
import { useFormik, Form, FormikProvider, useField } from 'formik';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Stack,
  Button,
  Rating,
  Tooltip,
  Divider,
  TextField,
  Typography,
  FormHelperText
} from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { addCart, onGotoStep } from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../../utils/formatNumber';
//
import { MIconButton } from '../../../../components/@material-extend';
import Label from '../../../../components/Label';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

// ----------------------------------------------------------------------

const Incrementer = (props) => {
  const [field, , helpers] = useField(props);
  // eslint-disable-next-line react/prop-types
  const { available } = props;
  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032'
      }}
    >
      <MIconButton size="small" color="inherit" disabled={value <= 1} onClick={decrementQuantity}>
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block'
        }}
      >
        {value}
      </Typography>
      <MIconButton size="small" color="inherit" disabled={value >= available} onClick={incrementQuantity}>
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  );
};

export default function BuildingDetailsSumary({ building }) {
  const theme = useTheme();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    onSubmit: async (values, { setSubmitting }) => {}
  });

  const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  return (
    <RootStyle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h5" paragraph>
            {building?.BuildingName}
          </Typography>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Stack spacing={3} sx={{ my: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Địa chỉ
              </Typography>
              <Box
                sx={{
                  maxWidth: 144,
                  justifyContent: 'flex-end'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  {building?.BuildingAddress}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Giá
              </Typography>
              <Box
                sx={{
                  maxWidth: 144,
                  justifyContent: 'flex-end'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  {building?.AveragePrice} VNĐ
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Tổng số phòng
              </Typography>
              <Box
                sx={{
                  maxWidth: 144,
                  justifyContent: 'flex-end'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  {building?.TotalRooms ? building?.TotalRooms : 0}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Người quản lý
              </Typography>
              <Box
                sx={{
                  maxWidth: 144,
                  justifyContent: 'flex-end'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  {building?.Employee.FullName}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Số điện thoại
              </Typography>
              <Box
                sx={{
                  maxWidth: 144,
                  justifyContent: 'flex-end'
                }}
              >
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  {building?.Employee.PhoneNumber}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Stack spacing={3} sx={{ my: 3 }}>
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Mô tả
            </Typography>
            <Markdown children={building?.Description} />
          </Stack>

          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 5 }}></Stack>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
