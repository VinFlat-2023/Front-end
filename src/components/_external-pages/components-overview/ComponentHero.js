import { motion } from 'framer-motion';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Box, Link, Container, Typography, Stack, Chip, Grid } from '@material-ui/core';
// components
import { varFadeInUp, varWrapEnter, varFadeInDown } from '../../animate';
//
import { MHidden } from '../../@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
}));

const StyleChip = styled(Chip)(() => ({
  width: 106,
  height: 48,
  borderRadius: 10
}));

const labelChip = [
  {id: 1, text: 'Tất Cả', value: 'all'},
  {id: 2, text: 'Quận 9', value: 'Quận 9'},
  {id: 3, text: 'Thủ Đức', value: 'Thủ Đức'},
  {id: 4, text: 'Tân Bình', value: 'Tân Bình'},
  {id: 5, text: 'Khác', value: 'Khác'}
]

export default function ComponentHero(props) {
  const { setSortValue } = props;
  const handleClick = (value) => {
    console.info(`You clicked the Chip ${value.text}`);
    setSortValue(value.value);
  };

  return (
    <RootStyle>
      <motion.div initial="initial" animate="animate" variants={varWrapEnter}>
        <Container
          maxWidth="lg"
          sx={{
            display: { md: 'flex' },
            justifyContent: { md: 'space-between' }
          }}
        >
          <div>
            <motion.div variants={varFadeInUp}>
              <Typography sx={{ marginBottom: 3, color: '#012972', fontSize: 16 }} variant="subtitle2" component="h1">
                Tìm theo quận
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInUp}>
              <Box sx={{ width: '45%' }}>
                <Grid container rowSpacing={2} columnSpacing={1}>
                  {labelChip.map((item )=> 
                    <Grid item xs={6}>
                    <StyleChip color="primary" label={item.text} variant="outlined" onClick={() => handleClick(item)} />
                  </Grid>
                  )}
                  
                  {/* <Grid item xs={6}>
                    <StyleChip color="primary" label={labelChip[1]} variant="outlined" onClick={() => this.chipFilter(labelChip)} />
                  </Grid>
                  <Grid item xs={6}>
                    <StyleChip color="primary" label={labelChip[2]} variant="outlined" onClick={() => this.chipFilter(labelChip)} />
                  </Grid>
                  <Grid item xs={6}>
                    <StyleChip color="primary" label={labelChip[3]} variant="outlined" onClick={() => this.chipFilter(labelChip)} />
                  </Grid>
                  <Grid item xs={6}>
                    <StyleChip color="primary" label={labelChip[4]} variant="outlined" onClick={() => this.chipFilter(labelChip)} />
                  </Grid> */}
                </Grid>
              </Box>
            </motion.div>
          </div>

          <MHidden width="mdDown">
            <motion.div variants={varFadeInDown}>
              <Box component="img" src="/static/illustrations/illustration_components.png" sx={{ maxHeight: 320 }} />
            </motion.div>
          </MHidden>
        </Container>
      </motion.div>
    </RootStyle>
  );
}
