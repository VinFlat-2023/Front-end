// material
import { styled, alpha } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import ProductCard from './common/ProductCard.jsx';
//
import { MotionInView, varFadeInUp } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundImage:
    theme.palette.mode === 'light'
      ? `linear-gradient(180deg, ${theme.palette.grey[0]} 0%, ${alpha(theme.palette.grey[0], 0)} 100%)`
      : 'none'
}));

// ----------------------------------------------------------------------

export default function LisBuilding(props) {
  const { data, total, sortValue, price } = props;

  let priceText = price/1000000;
  let text='';
  if(price === 0){
    text ='';
  }else{
    text = `dưới ${priceText} triệu.`
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
    </RootStyle>
  );
}
