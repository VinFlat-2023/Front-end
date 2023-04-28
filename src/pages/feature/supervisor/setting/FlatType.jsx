import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Button,
  Card,
  Checkbox,
  Container,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
// routes
import { PATH_SUPERVISOR } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import Label from '../../../../components/Label';
import Page from '../../../../components/Page';
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../../../components/_dashboard/user/list';
import FlatTypeMoreMenu from './components/FlatTypeMoreMenu';
// API
import { useDispatch, useSelector } from 'react-redux';
import { getFlatTypeList } from 'src/redux/slices/flat';
import axios from '../../../../utils/axios';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'FlatTypeName', label: 'Tên loại căn hộ', alignRight: false },
  // { id: 'userName', label: 'Tài khoản', alignRight: false },
  { id: 'RoomCapacity', label: 'Tổng số phòng', alignRight: false },
  // { id: 'phoneNumber', label: 'Số điện thoại', alignRight: false },
  { id: 'Status', label: 'Trạng thái', alignRight: false },
  { id: '' },
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
    return filter(array, (_user) => _user.FlatTypeName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function UserList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { flatTypeList, total } = useSelector((state) => state.flat);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState();

  useEffect(() => {
    dispatch(getFlatTypeList(page + 1, rowsPerPage));
  }, [filterName, page, rowsPerPage, filterStatus]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = flatTypeList.map((n) => n.FlatTypeId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    setFilteredUsers(applySortFilter(flatTypeList, getComparator(order, orderBy), filterName));
  }, [flatTypeList]);

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

  const handleChangeStatus = async (id) => {
    try {
      const response = await axios.put(`flats/type/${id}/toggle-status`);
      enqueueSnackbar(response.data.message, { variant: 'success' });
      if (id === filterStatus) {
        id = -id;
      }
      setFilterStatus(id);
    } catch (error) {
      console.log('error: ', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Page title="Loại căn hộ">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Loại căn hộ"
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Cài đặt', href: PATH_SUPERVISOR.setting.flatType },
            { name: 'Danh sách loại căn hộ' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_SUPERVISOR.setting.addFlatType}
              startIcon={<Icon icon={plusFill} />}
            >
              Thêm loại căn hộ
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
                  rowCount={flatTypeList?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {flatTypeList?.map((row) => {
                    const { FlatTypeId, FlatTypeName, RoomCapacity, Status } = row.FlatType;                    ;
                    const isItemSelected = selected.indexOf(FlatTypeId) !== -1;

                    return (
                      <TableRow
                        hover
                        key={FlatTypeId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, FlatTypeId)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {FlatTypeName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{RoomCapacity}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={Status ? 'success' : 'error'}
                          >
                            {Status ? 'Đang hoạt động' : 'Dừng hoạt động'}
                          </Label>
                        </TableCell>
                        <TableCell align="right">
                          <Switch
                            checked={Status}
                            onChange={() => handleChangeStatus(FlatTypeId, Status)}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </TableCell>

                        <TableCell align="right">
                          <FlatTypeMoreMenu id={FlatTypeId} />
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
            count={total}
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
