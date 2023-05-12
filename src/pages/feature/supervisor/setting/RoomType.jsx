import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Switch
} from '@material-ui/core';
// routes
import { PATH_SUPERVISOR } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { UserListHead, UserListToolbar } from '../../../../components/_dashboard/user/list';
import RoomTypeMoreMenu from './components/RoomTypeMoreMenu';
// API
import axios from '../../../../utils/axios';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'RoomTypeName', label: 'Tên phòng', alignRight: false },
  // { id: 'userName', label: 'Tài khoản', alignRight: false },
  { id: 'TotalSlot', label: 'Tổng số giường', alignRight: false },
  // { id: 'phoneNumber', label: 'Số điện thoại', alignRight: false },
  { id: 'Status', label: 'Trạng thái', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.RoomTypeName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function UserList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  // const { userList, total } = useSelector((state) => state.user);
  const [roomTypeList, setRoomTypeList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getFlatTypeList(page + 1, rowsPerPage);
  }, [filterName, page, rowsPerPage]);

  const getFlatTypeList = async (page, size) => {
    try {
      const response = await axios.get(`building/room-type`, {
        params: {
          PageSize: size,
          PageNumber: page,
          RoomTypeName: filterName
        }
      });
      setRoomTypeList(response.data.data);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.log('error: ', error);
      setRoomTypeList([]);
      setTotalCount(0);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = roomTypeList.map((n) => n.RoomTypeId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    setFilteredUsers(applySortFilter(roomTypeList, getComparator(order, orderBy), filterName));
  }, [roomTypeList]);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Page title="Loại Phòng">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Loại Phòng"
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Cài đặt', href: PATH_SUPERVISOR.setting.roomType },
            { name: 'Danh sách loại phòng' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_SUPERVISOR.setting.addRoomType}
              startIcon={<Icon icon={plusFill} />}
            >
              Thêm loại
            </Button>
          }
        />

        <Card>
          <UserListToolbar selected={selected} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={roomTypeList?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {roomTypeList.map((row) => {
                    const { RoomTypeId, RoomTypeName, TotalSlot, Status } = row;
                    const isItemSelected = selected.indexOf(RoomTypeId) !== -1;

                    return (
                      <TableRow
                        hover
                        key={RoomTypeId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, RoomTypeId)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {RoomTypeName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{TotalSlot}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={
                              Status === 'Active' ? 'success' : Status === 'Inactive' ? 'default' : 'error'
                            }
                          >
                            {Status === 'Active' ? 'Còn sử dụng' : Status === 'Inactive' ? 'Không sử dụng' : 'error'}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <RoomTypeMoreMenu id={RoomTypeId} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
//paging
//export to excel
//user list
//api call
