import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';

// hooks
import useSettings from '../../../../../../hooks/useSettings';
// components

import Label from '../../../../../../components/Label';
import Scrollbar from '../../../../../../components/Scrollbar';
import SearchNotFound from '../../../../../../components/SearchNotFound';
import { UserListHead } from '../../../../../../components/_dashboard/user/list';

// API
import axios from '../../../../../../utils/axios';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'TicketName', label: 'Tên yêu cầu', alignRight: false },
  { id: 'Description', label: 'Mô tả', alignRight: false },
  { id: 'Amount', label: 'Tổng tiền', alignRight: false },
  { id: 'CreatedDateReturn', label: 'Ngày tạo', alignRight: false },
  { id: 'SolveDateReturn', label: 'Ngày hoàn thành', alignRight: false },
  { id: 'Status', label: 'Trạng thái', alignRight: false },
  { id: '' },
  { id: '' }
];

const STATUS_ACTIVE = 'Active';
const STATUS_PROCESSING = 'Processing';
const STATUS_CONFORMING = 'Confirming';
const STATUS_SOLVED = 'Solved';
const STATUS_CANCELLED = 'Cancelled';

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

export default function ListRequestCancelComponent() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  // const { userList, total } = useSelector((state) => state.user);
  const [requestList, setRequestList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    loadData(page + 1, rowsPerPage);
  }, [ page, rowsPerPage]);

  const loadData = async (page, size) => {
    try {
      const response = await axios.get(`tickets?Status=Cancelled`, {
        params: {
          PageSize: size,
          PageNumber: page
        }
      });
      setRequestList(response.data.data);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.log('error: ', error);
      setRequestList([]);
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
      const newSelecteds = requestList.map((n) => n.TicketId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    setFilteredUsers(applySortFilter(requestList, getComparator(order, orderBy), filterName));
  }, [requestList]);

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

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={requestList?.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {requestList.map((row) => {
                const { TicketId, TicketName, Description, Amount, CreatedDateReturn, SolveDateReturn, Status } = row;
                const isItemSelected = selected.indexOf(TicketId) !== -1;

                return (
                  <TableRow
                    hover
                    key={TicketId}
                    tabIndex={-1}
                    role="checkbox"
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, TicketId)} />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                          {TicketName}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="left">{Description}</TableCell>
                    <TableCell align="left">{Amount}</TableCell>
                    <TableCell align="left">{CreatedDateReturn}</TableCell>
                    <TableCell align="left">{SolveDateReturn}</TableCell>
                    <TableCell align="left">
                      <Label
                        variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                        color={'error'}
                      >
                        Đã hủy
                      </Label>
                    </TableCell>
                    <TableCell align="right">
                      {/* <Switch
                        checked={Status}
                        onChange={() => handleChangeStatus(FlatTypeId, Status)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      /> */}
                    </TableCell>

                    <TableCell align="right">{/* <FlatTypeMoreMenu id={FlatTypeId} /> */}</TableCell>
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
    </>
  );
}
