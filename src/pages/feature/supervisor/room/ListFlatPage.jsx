import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
// redux
import { deleteUser, getUserList } from '../../../../redux/slices/user';
import { useDispatch, useSelector } from '../../../../redux/store';
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
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../../components/_dashboard/user/list';
import { getFlatList } from 'src/redux/slices/flat';
import MoreMenu from '../shared/MoreMenu';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên', alignRight: false },
  { id: 'type', label: 'Loại', alignRight: false },
  { id: 'status', label: 'Trạng thái', alignRight: false },
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

export default function FlatList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { flatList, flatTotal } = useSelector((state) => state.flat);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch(getFlatList(page + 1, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = flatList?.map((n) => n.Username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    setFilteredUsers(applySortFilter(flatList, getComparator(order, orderBy), filterName));
  }, [flatList]);

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - flatList.length) : 0;

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Page title="Danh sách căn hộ">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách căn hộ"
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Căn hộ', href: PATH_SUPERVISOR.room.listFlat },
            { name: 'Danh sách căn hộ' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_SUPERVISOR.room.create}
              startIcon={<Icon icon={plusFill} />}
            >
              Thêm căn hộ
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
                  rowCount={flatList?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {flatList?.map((row) => {
                    const { FlatId, Name, FlatType, Status } = row;
                    const isItemSelected = selected.indexOf(Name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={FlatId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, Name)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {Name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{FlatType.FlatTypeName}</TableCell>
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
                              ? 'Dừng hoạt động'
                              : Status === 'Full'
                              ? 'Đã đầy'
                              : 'warning'}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <MoreMenu
                            editPath={`${PATH_SUPERVISOR.room.root}/flat/edit/${FlatId}`}
                            onDelete={() => handleDeleteUser(FlatId)}
                            id={FlatId}
                          />
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
            count={flatTotal}
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
