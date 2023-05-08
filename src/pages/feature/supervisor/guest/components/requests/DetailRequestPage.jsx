import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack5';
// material
import { Container } from '@material-ui/core';
// routes
import { PATH_SUPERVISOR } from '../../../../../../routes/paths';
// hooks
import useSettings from '../../../../../../hooks/useSettings';
// components
import Page from '../../../../../../components/Page';
import HeaderBreadcrumbs from '../../../../../../components/HeaderBreadcrumbs';
import DetailRequestComponent from './DetailRequestComponent';
// API
import axios from '../../../../../../utils/axios';

// ----------------------------------------------------------------------

export default function DetailRequestPage() {
  const { themeStretch } = useSettings();
  const { id } = useParams(); // useParams use to get id of area on URL area/:id
  const { enqueueSnackbar } = useSnackbar();

  const [detailRequest, setDetailRequest] = useState('');

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    try {
      const response = await axios.get(`tickets/${id}`);
      setDetailRequest(response.data.data);
    } catch (error) {
      if (error.status === 'Not Found') {
        setDetailRequest('');
      }
      return console.error(error);
    }
  };



  return (
    <Page title={'Cập nhật trạng thái'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Cập nhật trạng thái'}
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Khách thuê', href: PATH_SUPERVISOR.guest.root },
            { name: 'Danh sách yêu cầu', href: PATH_SUPERVISOR.guest.listRequest },
            { name: 'Cập nhật trạng thái' }
          ]}
        />
       <DetailRequestComponent detailRequest={detailRequest}/>
      </Container>
    </Page>
  );
}
