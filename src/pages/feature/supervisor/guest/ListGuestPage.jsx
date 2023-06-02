import { sentenceCase } from 'change-case';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// material
import {
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
import { getGuestList } from 'src/redux/slices/guest';
import MoreMenu from '../shared/MoreMenu';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'FullName', label: 'Họ và tên', alignRight: false },
  { id: 'PhoneNumber', label: 'Số điện thoại', alignRight: false },
  { id: 'Email', label: 'Địa chỉ email', alignRight: false },
  { id: 'Address', label: 'Địa chỉ', alignRight: false },
  { id: 'BirthDateReturn', label: 'Ngày sinh', alignRight: false },
  { id: 'Gender', label: 'Giới tính', alignRight: false }, 
  { id: 'Status', label: 'Trạng thái', alignRight: false },
  { id: ''}
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

export default function ListGuestPage() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { guestList, guestTotal } = useSelector((state) => state.guest);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredUsers, setFilteredUsers] = useState([]);


  useEffect(() => {
    dispatch(getGuestList(page +1 ,rowsPerPage));
  }, [dispatch, page, rowsPerPage]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = guestList.map((n) => n.FullName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(()=>{
    setFilteredUsers(applySortFilter(guestList, getComparator(order, orderBy), filterName));
  },[guestList])

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - guestList?.length) : 0;


  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Page title="Danh sách khách thuê">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách tài khoản khách thuê VinFlat"
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Khách thuê', href: PATH_SUPERVISOR.guest.listGuest },
            { name: 'Danh sách khách thuê' }
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
                  rowCount={guestList?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {guestList?.map((row) => {
                    const {RenterId, FullName, PhoneNumber, Email, Address, BirthDateReturn, Gender, Status } = row;
                    const isItemSelected = selected.indexOf(FullName) !== -1;

                   
                    return (
                      <TableRow
                        hover
                        key={RenterId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, FullName)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {FullName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{PhoneNumber}</TableCell>
                        <TableCell align="left">{Email}</TableCell>
                        <TableCell align="left">{Address}</TableCell>
                        <TableCell align="left">{BirthDateReturn}</TableCell>
                        <TableCell align="left">{Gender === 'Male' ? 'Nam' : "Nữ"}</TableCell>
                       
                        <TableCell align="left">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={Status ? 'success' : 'error'}
                          >
                            {sentenceCase(Status ? "Dang hoat dong" : "Khong hoat dong")}
                          </Label>
                        </TableCell>  

                        <TableCell align="right">
                          <MoreMenu editPath={`${PATH_SUPERVISOR.guest.root}/${RenterId}`}  onDelete={() => handleDeleteUser(RenterId)} id={RenterId} />
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
            count={guestTotal}
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
