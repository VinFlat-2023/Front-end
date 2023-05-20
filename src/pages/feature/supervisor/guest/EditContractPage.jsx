// material
import {
  Container
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PATH_SUPERVISOR } from 'src/routes/paths';
import CreateContractForm from './components/CreateContractForm';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getContractById } from 'src/redux/slices/contract';
// ----------------------------------------------------------------------

export default function EditContractPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const { currentContract } = useSelector(state => state.contract);

  useEffect(() => {
    dispatch(getContractById(id));
  }, [id]);

  return (
    <Page title={'Thông tin hợp đồng'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'Thêm thành viên mới'}
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Quản lý hợp đồng', href: PATH_SUPERVISOR.guest.listContract },
            { name: 'Thông tin hợp đồng' }
          ]}
        />

        <CreateContractForm currentContract={currentContract} isNewUser={false} isEditPage={true} />

      </Container>
    </Page>
  );
}
