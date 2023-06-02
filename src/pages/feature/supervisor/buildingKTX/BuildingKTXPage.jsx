import { Page } from '@react-pdf/renderer';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { LoadingButton } from '@material-ui/lab';
import { PATH_SUPERVISOR } from 'src/routes/paths';
import UploadMultiFile from '../../../../components/upload/UploadMultiFile';
import { styled } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import { useSnackbar } from 'notistack5';

import * as Yup from 'yup';
import { Card, Grid, Stack, TextField, Container, Typography } from '@material-ui/core';
import CreateEditBuildingForm from './components/CreateEditBuidingForm';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function Dormitory() {
  const { enqueueSnackbar } = useSnackbar();
  const [building, setBuilding] = useState('');
  const [area, setArea] = useState([]);
  const [buildingExists, setBuildingExists] = useState(false);

  const getCurrentBuilding = async () => {
    try {
      const response = await axios.get('buildings/current');
      setBuilding(response.data.data);
      setBuildingExists(true);
      enqueueSnackbar(response.data.message, { variant: 'success' });
    } catch (error) {
      setBuildingExists(false);
      setBuilding(error.message);

      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const getAllArea = async () => {
    try {
      const response = await axios.get('areas/no-paging');
      setArea(response.data.data);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    getCurrentBuilding();
    getAllArea();
  }, []);

  return (
    <Page title="Toà nhà KTX">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={'Toà nhà KTX'}
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.home },
            {
              name: 'Toà nhà KTX',
              href: PATH_SUPERVISOR.domitory
            }
          ]}
        />

        <CreateEditBuildingForm area={area} building={building} buildingExists={buildingExists} />
      </Container>
    </Page>
  );
}
