// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_SUPERVISOR } from 'src/routes/paths';
import Page from '../../../../components/Page';
// material
import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  CircularProgress,
  Backdrop,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
// components
import receiptIcon from '@iconify/icons-ic/receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { createBatchInvoice, getInvoiceList } from 'src/redux/slices/finance';
import { useDispatch, useSelector } from 'src/redux/store';
import { getTabLabel } from 'src/utils/formatText';
import { BillTable } from './components/BillTable';
import { INVOICE_TYPE } from './type';
import { useSnackbar } from 'notistack5';


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

// ----------------------------------------------------------------------

const INCOME_TABLE_HEAD = [
  { id: 'name', label: 'Tên Hóa đơn', alignRight: false },
  { id: 'guest', label: 'Người thuê', alignRight: false },
  { id: 'manager', label: 'Người quản lí', alignRight: false },
  { id: 'total', label: 'Tổng tiền', alignRight: false },
  { id: 'expriteDare', label: 'Hạn thanh toán', alignRight: false },
  { id: 'completeDate', label: 'Ngày thanh toán', alignRight: false },
  { id: 'status', label: 'Trạng thái', alignRight: false },
  { id: '' }
];

const EXPENSE_TABLE_HEAD = [
  { id: 'name', label: 'Tên Hóa đơn', alignRight: false },
  { id: 'manager', label: 'Người quản lí', alignRight: false },
  { id: 'total', label: 'Tổng tiền', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

export default function BillsPage() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { invoiceList, invoiceTotal } = useSelector(state => state.finance);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentTab, setCurrentTab] = useState('income');
  const [openDialog, setOpenDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let invoiceType;
    if (currentTab === 'income') {
      invoiceType = 1
    } else if (currentTab === 'expense') {
      invoiceType = 2
    }
    dispatch(getInvoiceList(page + 1, rowsPerPage, invoiceType));
  }, [dispatch, page, rowsPerPage, currentTab]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = invoiceList.map((n) => n.Username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    setFilteredUsers(applySortFilter(invoiceList, getComparator(order, orderBy), filterName));
  }, [invoiceList]);

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

  };

  const onAddContractClick = () => {
    setOpenDialog(true);
  }

  const onCloseDialog = () => {
    setOpenDialog(false);
  }

  const onCreateBills = async () => {
    try {
      setOpenDialog(false);
      setIsProcessing(true);
      await dispatch(createBatchInvoice(enqueueSnackbar));
    } catch (ex) {
      setOpenDialog(false);
    } finally {
      setIsProcessing(false);
    }
  }
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - invoiceList.length) : 0;

  const isUserNotFound = filteredUsers?.length === 0;

  const INVOICE_TABS = [
    {
      key: 1,
      value: 'income',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <BillTable
        selected={selected}
        type={INVOICE_TYPE.INCOME}
        page={page}
        filterName={filterName}
        theme={theme}
        order={order}
        orderBy={orderBy}
        invoiceList={invoiceList}
        isUserNotFound={isUserNotFound}
        invoiceTotal={invoiceTotal}
        rowsPerPage={rowsPerPage}
        tableHead={INCOME_TABLE_HEAD}
        handleChangePage={handleChangePage}
        handleRequestSort={handleRequestSort}
        handleSelectAllClick={handleSelectAllClick}
        handleClick={handleClick}
        handleDeleteUser={handleDeleteUser}
        handleFilterByName={handleFilterByName}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    },
    // {
    //   key: 2,
    //   value: 'expense',
    //   icon: <Icon icon={receiptIcon} width={20} height={20} />,
    //   component: <BillTable
    //     selected={selected}
    //     type={INVOICE_TYPE.EXPENSE}
    //     page={page}
    //     filterName={filterName}
    //     theme={theme}
    //     order={order}
    //     orderBy={orderBy}
    //     invoiceList={invoiceList}
    //     isUserNotFound={isUserNotFound}
    //     invoiceTotal={invoiceTotal}
    //     rowsPerPage={rowsPerPage}
    //     tableHead={EXPENSE_TABLE_HEAD}
    //     handleChangePage={handleChangePage}
    //     handleFilterByName={handleFilterByName}
    //     handleRequestSort={handleRequestSort}
    //     handleSelectAllClick={handleSelectAllClick}
    //     handleClick={handleClick}
    //     handleDeleteUser={handleDeleteUser}
    //     handleChangeRowsPerPage={handleChangeRowsPerPage}
    //   />
    // }
  ];

  return (
    <Page title="Danh sách hóa đơn VinFlat">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách hóa đơn"
          links={[
            { name: 'Trang chủ', href: PATH_SUPERVISOR.home },
            { name: 'Quản lý  tài chính', href: PATH_SUPERVISOR.finances.bill },
            { name: 'Danh sách hóa đơn' }
          ]}
          action={
            <Button
              variant="contained"
              onClick={onAddContractClick}
              startIcon={<Icon icon={plusFill} />}
            >
              Thêm hóa đơn
            </Button>
          }
        />
        <Dialog
          open={openDialog}
          onClose={onCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Tạo hoá đơn"}
          </DialogTitle>
          <DialogContent>

            Tạo hoá đơn và gửi email thông báo cho tất cả người dùng

          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseDialog}>Hủy</Button>
            <Button onClick={onCreateBills} autoFocus>
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isProcessing}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {INVOICE_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={getTabLabel(tab.value)}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>

          {INVOICE_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>

      </Container>
    </Page>
  );
}
