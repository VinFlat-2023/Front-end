// material
import {
    Container
} from '@material-ui/core';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PATH_SUPERVISOR } from 'src/routes/paths';
import { ExistedGuestForm } from './components/ExistedGuestForm';
import { Stack, TextField, Grid, Card } from "@material-ui/core";
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { getGuestById } from 'src/redux/slices/guest';
import { useDispatch, useSelector } from 'src/redux/store';
// ----------------------------------------------------------------------

export default function ExistedGuestPage() {
    const { themeStretch } = useSettings();
    const {id} = useParams();
    const dispatch = useDispatch();
    const {currentGuest} = useSelector(state => state.guest);
    useEffect(()=>{
        dispatch(getGuestById(id));
    },[])

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

                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Card sx={{ p: 5 }}>
                            <Stack spacing={3}>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Tên tài khoản"
                                        value={currentGuest?.Username}
                                        
                                        
                                    />
                                    <TextField
                                        fullWidth
                                        label="Địa chỉ email"
                                        value={currentGuest?.Email}

                                    />
                                </Stack>

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Số điện thoại"
                                        value={currentGuest?.Phone}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Ngày sinh"
                                        value={currentGuest?.BirthDateReturn}
                                    />
                                </Stack>

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Địa chỉ"
                                        value={currentGuest?.Address}
                                    />
                                    <TextField
                                        fullWidth
                                        label="CMND/CCCD"
                                        value={currentGuest?.CitizenNumber}
                                    />
                                </Stack>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Giới tính"
                                        value={currentGuest?.Gender}
                                    />
                                    <TextField
                                        select
                                        fullWidth
                                        label="Trạng thái"
                                        value={currentGuest?.Status ? "Đang hoạt động" : "Ngưng hoạt động"}
                                    >

                                    </TextField>
                                </Stack>

                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
