import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Link, Paper, Typography, CardActionArea } from '@material-ui/core';
//
import { varFadeInUp, MotionInView } from '../../../../components/animate';
//
import { PATH_PUBLIC} from '../../../../routes/paths';

// ----------------------------------------------------------------------

ProductCard.propTypes = {
  item: PropTypes.object.isRequired
};

export default function ProductCard({ item }) {
  const { BuildingName, BuildingImageUrl1, BuildingId } = item;

  const linkto = `${PATH_PUBLIC.buildingDetail}/${BuildingId}`

  return (
    <MotionInView variants={varFadeInUp}>
      <Link component={RouterLink} to={linkto} underline="none">
        <Paper
          sx={{
            m: 2,
            boxShadow: (theme) => theme.customShadows.z8,
            '&:hover img': { transform: 'scale(1.1)' }
          }}
        >
          <CardActionArea
            sx={{
              p: 3,
              borderRadius: 1,
              color: 'primary.main',
              bgcolor: `primary.grey[0]`
            }}
          >
            <Box
              component="img"
              src={BuildingImageUrl1}
              alt={BuildingName}
              sx={{
                height: 310,
                width: 292,
                borderRadius: 2,
                mx: 'auto',
                transition: (theme) => theme.transitions.create('all')
              }}
            />
          </CardActionArea>

          <Typography variant="subtitle2" sx={{ mt: 1, p: 1, textAlign: 'center' }}>
            {BuildingName}
          </Typography>
        </Paper>
      </Link>
    </MotionInView>
  );
}
