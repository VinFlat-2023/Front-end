// material
import { styled, alpha } from '@material-ui/core/styles';
import { Grid, Typography, Pagination, Container } from '@material-ui/core';
import ProductCard from './common/ProductCard.jsx';
//
import { MotionInView, varFadeInUp } from '../../animate';
import { Block } from '../../../pages/components-overview/Block.js';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundImage:
    theme.palette.mode === 'light'
      ? `linear-gradient(180deg, ${theme.palette.grey[0]} 0%, ${alpha(theme.palette.grey[0], 0)} 100%)`
      : 'none'
}));
const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { my: 1 },
  margin: '0 auto'
};

// ----------------------------------------------------------------------

export default function LisBuilding(props) {
  const { data, total, sortValue, price, totalPages } = props;

  let priceText = price / 1000000;
  let text = '';
  if (price === 0 || price === '') {
    text = '';
  } else {
    text = `dưới ${priceText} triệu.`;
  }
  return (
    <RootStyle>
      <MotionInView variants={varFadeInUp}>
        <Typography variant="h4" sx={{ mt: 1, p: 1, textAlign: 'left', color: 'black' }}>
          Có <strong style={{ color: '#3366FF' }}>{total} Chi nhánh </strong> ở khu vực{' '}
          {sortValue === 'all' ? '' : sortValue} {text}
        </Typography>
      </MotionInView>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid key={item.BuildingId} item xs={12} sm={6} md={3}>
            <ProductCard key={item.BuildingId} item={item} />
          </Grid>
        ))}
      </Grid>
      <MotionInView variants={varFadeInUp}>
        <Container maxWidth="lg">
          <Grid item xs={12} md={6}>
            <Block sx={style}>
              <Pagination onChange={ } count={totalPages} shape="rounded" color="primary" />
            </Block>
          </Grid>
        </Container>
      </MotionInView>
    </RootStyle>
  );
}
