import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Grid, Card, Typography, CardContent, Link } from '@material-ui/core';
import { Link as RouterLink, Route } from 'react-router-dom';
import ComponentsOverview from '../../../../pages/ComponentsOverview';
// utils

// ----------------------------------------------------------------------

const CaptionStyle = styled(CardContent)(({ theme }) => ({
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  backdropFilter: 'blur(3px)',
  WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
  justifyContent: 'space-between',
  color: theme.palette.common.white,
  backgroundColor: alpha(theme.palette.grey[900], 0.72),
  borderBottomLeftRadius: theme.shape.borderRadiusMd,
  borderBottomRightRadius: theme.shape.borderRadiusMd
}));

const GalleryImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const StyledCard = styled(Card)(({ theme }) => ({
  '&:hover': {
    transform: 'scale(1.1)'
  }
}));
// ----------------------------------------------------------------------
const CARDS = [
  {
    id: 1,
    title: 'Quận 9',
    imageUrl: 'https://www.nhatrosachse.com/images/desk/quan-9-min.png'
  },
  {
    id: 2,
    title: 'Thủ Đức',
    imageUrl: 'https://www.nhatrosachse.com/images/desk/thu-duc-min.png'
  },
  {
    id: 3,
    title: 'Bình Tân',
    imageUrl: 'https://www.nhatrosachse.com/images/desk/tan-binh-min.png'
  },
  {
    id: 4,
    title: 'Khác',
    imageUrl: 'https://www.nhatrosachse.com/images/desk/khu-vuc-khac-min.png'
  }
];
// ----------------------------------------------------------------------

GalleryItem.propTypes = {
  image: PropTypes.object,
  onOpenLightbox: PropTypes.func
};

function GalleryItem({ image }) {
  const { imageUrl, title } = image;
  return (
    <StyledCard sx={{ pt: '100%', cursor: 'pointer', height: '312px' }}>
      <Link component={RouterLink} to={`/components`}>
        <GalleryImgStyle alt="gallery image" src={imageUrl} onClick={()=>localStorage.setItem('AreaName', title)} />

        <CaptionStyle>
          <div>
            <Typography variant="subtitle1">{title}</Typography>
          </div>
        </CaptionStyle>
      </Link>
    </StyledCard>
  );
}

ProfileGallery.propTypes = {
  gallery: PropTypes.array.isRequired
};

export default function ProfileGallery() {
  return (
    <Box sx={{ mt: 5 }}>
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2.4}>
            <Typography variant="h4">
              Tìm phòng <br /> Kí Túc Xá dễ hơn
            </Typography>
            <Typography>Thuê phòng nhanh.</Typography>
          </Grid>
          {CARDS.map((item) => (
            <Grid key={item.id} item xs={2.4}>
              <GalleryItem image={item} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
