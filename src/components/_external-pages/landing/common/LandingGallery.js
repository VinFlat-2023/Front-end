import { findIndex } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Grid, Card, CardActionArea, Typography, CardContent } from '@material-ui/core';
// utils
import { fDate } from '../../../../utils/formatTime';
import LightboxModal from '../../../LightboxModal';

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
  },
}));
// ----------------------------------------------------------------------

GalleryItem.propTypes = {
  image: PropTypes.object,
  onOpenLightbox: PropTypes.func
};

function GalleryItem({ image, onOpenLightbox }) {
  const { imageUrl, title } = image;
  return (
    <StyledCard sx={{ pt: '100%', cursor: 'pointer', height: '312px' }}>
      <GalleryImgStyle alt="gallery image" src={imageUrl} onClick={() => onOpenLightbox(imageUrl)} />

      <CaptionStyle>
        <div>
          <Typography variant="subtitle1">{title}</Typography>
        </div>
      </CaptionStyle>
    </StyledCard>
  );
}

ProfileGallery.propTypes = {
  gallery: PropTypes.array.isRequired
};

export default function ProfileGallery({ gallery }) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const imagesLightbox = gallery.map((img) => img.imageUrl);

  const handleOpenLightbox = (url) => {
    const selectedImage = findIndex(imagesLightbox, (index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

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
          {gallery.map((image) => (
            <Grid key={image.id} item xs={2.4}>
              <GalleryItem image={image} onOpenLightbox={handleOpenLightbox} />
            </Grid>
          ))}
        </Grid>

        <LightboxModal
          images={imagesLightbox}
          photoIndex={selectedImage}
          setPhotoIndex={setSelectedImage}
          isOpen={openLightbox}
          onClose={() => setOpenLightbox(false)}
        />
      </Card>
    </Box>
  );
}
