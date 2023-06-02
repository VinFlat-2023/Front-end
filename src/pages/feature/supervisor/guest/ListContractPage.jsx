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
import { deleteUser } from '../../../../redux/slices/user';
import { useDispatch, useSelector } from '../../../../redux/store';
// routes
import { PATH_SUPERVISOR } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import { getContractList } from 'src/redux/slices/contract';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import Label from '../../../../components/Label';
import Page from '../../../../components/Page';
import Scrollbar from '../../../../components/Scrollbar';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../../components/_dashboard/user/list';
import MoreMenu from '../shared/MoreMenu';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên hợp đồng', alignRight: false },
  { id: 'renter', label: 'Khách thuê', alignRight: false },
  { id: 'contractDetail', label: 'Chi tiết', alignRight: false },
  { id: 'startDate', label: 'Ngày bắt đầu', alignRight: false },
  { id: 'endDate', label: 'Ngày kết thúc', alignRight: false },
  { id: 'signedDate', label: 'Ngày kí', alignRight: false },
  { id: 'ContractStatus', label: 'Trạng thái', alignRight: false },
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

export default function ContractList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { contractList, total } = useSelector((state) => { console.log("sttae", state); return state.contract});
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredUsers, setFilteredUsers] = useState([]);


  useEffect(() => {
    dispatch(getContractList(page +1 ,rowsPerPage));
  }, [dispatch, page, rowsPerPage]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = contractList?.map((n) => n.Username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(()=>{
    setFilteredUsers(applySortFilter(contractList, getComparator(order, orderBy), filterName));
  },[contractList])

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contractList.length) : 0;


  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Page title="Danh sách hợp đồng">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách hợp đồng"
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.root },
            { name: 'Khách thuê', href: PATH_SUPERVISOR.guest.listContract },
            { name: 'Danh sách hợp đồng' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_SUPERVISOR.guest.createContract}
              startIcon={<Icon icon={plusFill} />}
            >
              Thêm hợp đồng
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
                  rowCount={contractList?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {contractList?.map((row) => {
                    const { ContractId, Renter, ContractName, Description, StartDateReturn, EndDateReturn, DateSignedReturn, ContractStatus  } = row;
                    const isItemSelected = selected.indexOf(ContractName) !== -1;

                    return (
                      <TableRow
                        hover
                        key={ContractId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, ContractName)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {ContractName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{Renter.FullName}</TableCell>
                        <TableCell align="left">{Description}</TableCell>
                        <TableCell align="left">{StartDateReturn}</TableCell>
                        <TableCell align="left">{EndDateReturn}</TableCell>
                        <TableCell align="left">{DateSignedReturn}</TableCell>
                        <TableCell align="left">
                          <Label
                          
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={
                              ContractStatus === 'Active' ? 'success' : ContractStatus === 'Expired' ? 'default' :ContractStatus === 'Cancelled' ? 'error': 'warning'
                            }
                          >
                            {ContractStatus === 'Active' ? 'Còn hiệu lực' : ContractStatus === 'Expired' ? 'Hết hạn' :ContractStatus === 'Cancelled' ? 'Đã hủy': 'warning'}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <MoreMenu editPath={`${PATH_SUPERVISOR.guest.root}/contract/${ContractId}`} onDelete={() => handleDeleteUser(ContractId)} id={ContractId} />
                        </TableCell>
                      </TableRow>
                    );
                  })}

                </TableBody>
                {!contractList && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      Không tìm thấy hợp đồng nào cho tòa nhà này
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
            count={total ?? 0}
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
