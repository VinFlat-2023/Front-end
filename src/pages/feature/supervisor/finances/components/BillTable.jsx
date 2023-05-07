import {
    Card,
    Checkbox,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography
} from '@material-ui/core';
import SearchNotFound from 'src/components/SearchNotFound';

import Label from 'src/components/Label';
import Scrollbar from 'src/components/Scrollbar';
import { UserListHead, UserListToolbar, UserMoreMenu } from 'src/components/_dashboard/user/list';
import { INVOICE_TYPE } from '../type';

export const BillTable = ({
    selected,
    type,
    page,
    filterName,
    theme,
    order,
    orderBy,
    invoiceList,
    isUserNotFound,
    invoiceTotal,
    rowsPerPage,
    tableHead,
    handleChangePage,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleDeleteUser,
    handleFilterByName,
    handleChangeRowsPerPage,
}) => {
    return (
        <Card>
            <UserListToolbar selected={selected} filterName={filterName} onFilterName={handleFilterByName} />

            <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <UserListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={tableHead}
                            rowCount={invoiceList?.length}
                            numSelected={selected.length}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllClick}
                        />
                        <TableBody>
                            {invoiceList.map((row) => {
                                const { InvoiceId, Name, Renter, Employee, InvoiceDetails, DueDate, PaymentTime, InvoiceType } = row;
                                const isItemSelected = selected.indexOf(Name) !== -1;
                                return (
                                    <TableRow
                                        hover
                                        key={InvoiceId}
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
                                        {type === INVOICE_TYPE.INCOME &&
                                            <TableCell align="left">{Renter.Username}</TableCell>}
                                        <TableCell align="left">{Employee.Username}</TableCell>
                                        <TableCell align="left">{InvoiceDetails.Amount}</TableCell>
                                        {type === INVOICE_TYPE.INCOME &&
                                            <TableCell align="left">{DueDate}</TableCell>}
                                        {type === INVOICE_TYPE.INCOME &&
                                            <TableCell align="left">{PaymentTime}</TableCell>}
                                        {type === INVOICE_TYPE.INCOME &&
                                            <TableCell align="left">
                                                <Label
                                                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                                    color={(InvoiceType.Status === 'false' && 'error') || 'success'}
                                                >
                                                    {InvoiceType.Status ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                                </Label>
                                            </TableCell>}

                                        <TableCell align="right">
                                            <UserMoreMenu onDelete={() => handleDeleteUser(InvoiceId)} id={InvoiceId} />
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
                count={invoiceTotal}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    )
}