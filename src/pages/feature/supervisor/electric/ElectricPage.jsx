import { Page } from '@react-pdf/renderer';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_SUPERVISOR } from 'src/routes/paths';
import { styled } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import { useSnackbar } from 'notistack5';
//
import { Container, Typography } from '@material-ui/core';
// components
import ElectricForm from './components/ElectricForm';

export default function ElectricPage() {
  const { enqueueSnackbar } = useSnackbar();

  const [electricWater, setElectricWater] = useState('');
  const [listFlats, setListFlats] = useState([]);
  const [flats, setFlats] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    getFlatActive();
  }, []);
  useEffect(() => {
    getTotalElectricWater(flats);
  }, [flats]);

  const getFlatActive = async () => {
    try {
      const rs = await axios.get('/flats/active');
      setListFlats(rs.data.data);
    } catch (error) {
      enqueueSnackbar('Lỗi khi lấy danh sách căn hộ', { variant: 'error' });
    }
  };
  const onChangeFlat = (event) => {
    setFlats(event.target.value);
  };
  const getTotalElectricWater = async (flatId) => {
    try {
      const rs = await axios.get(`/metric/current/building/flat/${flatId}`);
      setElectricWater(rs.data.data);
      setIsDisabled(false);
      enqueueSnackbar(rs.data.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Chọn căn hộ để cập nhật', { variant: 'error' });
    }
  };

  return (
    <Page title="Cập nhật số điện nước">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={'Cập nhật số điện nước'}
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.home },
            {
              name: 'cập nhật số điện nước',
              href: PATH_SUPERVISOR.electric
            }
          ]}
        />
        <ElectricForm
          electricWater={electricWater}
          listFlats={listFlats}
          onChangeFlat={onChangeFlat}
          flats={flats}
          isDisabled={isDisabled}
        />
      </Container>
    </Page>
  );
}
