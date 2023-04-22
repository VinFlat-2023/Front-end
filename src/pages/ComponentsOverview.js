// material
import { styled } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
// components
import Page from '../components/Page';
import { ComponentHero, LisBuilding } from '../components/_external-pages/components-overview';
// API
import axios from '../utils/axios';
import { useEffect, useState } from 'react';
// import localStorage from 'redux-persist/es/storage';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

// ----------------------------------------------------------------------

export default function ComponentsOverview(props) {
  const { area } = props;
  const [listBuilding, setListBuilding] = useState([]);

  const [sortValue, setSortValue] = useState(area);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePrice = (value) => {
    // console.log('change: ', value.target.value);
    setPrice(value.target.value);
  };
  if (price === 0) {
    setPrice('');
  }
  const handleChangePage = (e, value) => {
    setCurrentPage(value);
  };
  const fetchData = async () => {
    try {
      const data = await axios.get(`buildings`, {
        params: {
          AreaName: sortValue,
          AveragePrice: price,
          PageSize: 12,
          PageNumber: currentPage
        }
      });
      setListBuilding(data.data.data);
      setTotal(data.data.totalCount);
      setTotalPages(data.data.totalPage);
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
  }, [sortValue, price, currentPage]);

  return (
    <RootStyle title="Tìm kiếm | VinFlat">
      <ComponentHero
        price={price}
        handleChangePrice={handleChangePrice}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
      <Container maxWidth="lg">
        <LisBuilding
          data={listBuilding}
          total={total}
          sortValue={sortValue}
          price={price}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      </Container>
    </RootStyle>
  );
}
