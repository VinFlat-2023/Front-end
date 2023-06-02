// material
import {
    Box,
    Container
} from '@material-ui/core';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PATH_SUPERVISOR } from 'src/routes/paths';
import { ExistedGuestForm } from './components/ExistedGuestForm';
import { Stack, TextField, Grid, Card } from "@material-ui/core";
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getGuestById, updateRenterStatus } from 'src/redux/slices/guest';
import { useDispatch, useSelector } from 'src/redux/store';
import PopoversComponent from 'src/pages/components-overview/material-ui/Popover';
import { Form, FormikProvider, useFormik, Formik } from 'formik';
import LoadingButton from 'src/theme/overrides/LoadingButton';
import { useSnackbar } from 'notistack5';
import EditGuestForm from './components/EditGuestForm';
// ----------------------------------------------------------------------


export default function ExistedGuestPage() {
    const { themeStretch } = useSettings();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentGuest } = useSelector(state => state.guest);

    useEffect(() => {
        dispatch(getGuestById(id));
    }, [])

    return (
        <Page title={'Thông tin chi tiết về khách thuê'}>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading={'Thông tin chi tiết về khách thuê'}
                    links={[
                        { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
                        { name: 'Khách thuê', href: PATH_SUPERVISOR.guest.listGuest },
                        { name: 'Thông tin khách thuê' }
                    ]}
                />
                
                <EditGuestForm currentGuest={currentGuest}/>
                
            </Container>
        </Page>
    );
}
