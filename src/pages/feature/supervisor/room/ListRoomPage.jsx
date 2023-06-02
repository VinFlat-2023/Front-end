import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useMemo } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getUserList, deleteUser } from '../../../../redux/slices/user';
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
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../../components/_dashboard/user/list';
import { getRoomList } from 'src/redux/slices/room';
import MoreMenu from '../shared/MoreMenu';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'RoomName', label: 'Phòng', alignRight: false },
  { id: 'RoomType', label: 'Loại phòng', alignRight: false },
  { id: 'FlatName', label: 'Tên căn hộ', alignRight: false },
  { id: 'AvailaleSlots', label: 'Số vị trí còn trống', alignRight: false },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function UserList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { roomList, total } = useSelector((state) => state.room);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch(getRoomList(page + 1, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = roomList?.map((n) => n.RoomName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - roomList.length) : 0;

  const isUserNotFound = filterName?.length === 0;

  return (
    <Page title="Danh sách phòng">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách phòng"
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Phòng', href: PATH_SUPERVISOR.room.listRoom },
            { name: 'Danh sách phòng' }
          ]}
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
                  rowCount={roomList?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {roomList?.map((row) => {
                    const { RoomId, RoomName, RoomType, Flat, AvailableSlots, Status } = row;
                    console.log('row', Flat);
                    const isItemSelected = selected.indexOf(RoomName) !== -1;

                    return (
                      <TableRow
                        hover
                        key={RoomId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, RoomName)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {RoomName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{RoomType.RoomTypeName}</TableCell>
                        <TableCell align="left">{Flat?.Name}</TableCell>
                        <TableCell align="left">{AvailableSlots}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={
                              Status === 'Active'
                                ? 'success'
                                : Status === 'Maintenance'
                                ? 'default'
                                : Status === 'Full'
                                ? 'info'
                                : 'warning'
                            }
                          >
                            {Status === 'Active'
                              ? 'Đang hoạt động'
                              : Status === 'Maintenance'
                              ? 'Bảo trì'
                              : Status === 'Inactive'
                              ? 'Không hoạt động'
                              : Status === 'Full'
                              ? 'Đã đầy'
                              : 'warning'}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <MoreMenu
                            editPath={`${PATH_SUPERVISOR.room.root}/edit/${RoomId}`}
                            onDelete={() => handleDeleteUser(RoomId)}
                            id={RoomId}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                {/* {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
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
