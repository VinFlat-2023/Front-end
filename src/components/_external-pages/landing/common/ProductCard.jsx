import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Link, Grid, Paper, Typography, CardActionArea } from '@material-ui/core';
//
import { varFadeInUp, MotionInView } from '../../../../components/animate';

// ----------------------------------------------------------------------

ProductCard.propTypes = {
  item: PropTypes.object.isRequired
};

export default function ProductCard({ item }) {
  const { BuildingName, ImageUrl } = item;

  return (
   
      <MotionInView variants={varFadeInUp}>
        <Link component={RouterLink} to='#' underline="none">
          <Paper
            sx={{
              p: 1,
              boxShadow: (theme) => theme.customShadows.z8,
              '&:hover img': { transform: 'scale(1.1)' }
            }}
          >
            <CardActionArea
              sx={{
                p: 3,
                borderRadius: 1,
                color: 'primary.main',
                bgcolor: 'background.neutral'
              }}
            >
              <Box
                component="img"
                src={ImageUrl}
                alt={BuildingName}
                sx={{
                  mx: 'auto',
                  transition: (theme) => theme.transitions.create('all')
                }}
              />
            </CardActionArea>

            <Typography variant="subtitle2" sx={{ mt: 1, p: 1 }}>
              {BuildingName}
            </Typography>
          </Paper>
        </Link>
      </MotionInView>
  );
}
