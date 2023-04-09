// material
import { styled } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
// components
import Page from '../components/Page';
import { ComponentHero, LisBuilding } from '../components/_external-pages/components-overview';
// API
import axios from '../utils/axios';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

// ----------------------------------------------------------------------

export default function ComponentsOverview() {
  const [listBuilding, setListBuilding] = useState([]);
  const [sortValue, setSortValue] = useState('all');
  const [total, setTotal] = useState(0);
  const fetchData = async () => {
    try {
      const data = await axios.get(`buildings/order/${sortValue}`);
      setListBuilding(data.data.data);
      setTotal(data.data.totalCount)
    } catch (error) {
      if (error.status === 'Not Found') {
        setListBuilding([]);
        setTotal(0);
      }
      return console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [sortValue]);

  return (
    <RootStyle title="Components Overview | VinFlat">
      <ComponentHero setSortValue={setSortValue} />
      <Container maxWidth="lg">
        <LisBuilding data={listBuilding} total={total} sortValue={sortValue} />
        {/* <ComponentFoundation /> */}
        {/* <ComponentMaterialUI />
        <ComponentOther /> */}
      </Container>
    </RootStyle>
  );
}
