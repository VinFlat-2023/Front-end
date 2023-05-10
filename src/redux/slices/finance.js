import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { PATH_SUPERVISOR } from 'src/routes/paths';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  invoiceList: [],
  invoiceTotal: 0,
  currentBill: null
};

const slice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getInvoiceListSuccess(state, action) {
      state.isLoading = false;
      state.invoiceList = action.payload.invoiceList;
      state.invoiceTotal = action.payload.total;
    },

    resetInvoiceList(state) {
      state.isLoading = false;
      state.invoiceList = [];
      state.invoiceTotal = 0;
    },

    getCurrentBillSuccess(state, action) {
      state.currentBill = action.payload.data;
    }
  }
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

export function getInvoiceList(pageNumber, pageSize, invoiceType, status) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = status
        ? `/invoices?PageNumber=${pageNumber ?? 1}&PageSize=${
            pageSize ?? 5
          }&InvoiceTypeId=${invoiceType}&Status=${status}`
        : `/invoices?PageNumber=${pageNumber ?? 1}&PageSize=${pageSize ?? 5}&InvoiceTypeId=${invoiceType}`;
      const response = await axios.get(url);
      dispatch(
        slice.actions.getInvoiceListSuccess({
          invoiceList: response.data.data,
          total: response.data.totalCount
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.resetInvoiceList());
    }
  };
}

export function getInvoiceById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/invoices/${id}`;
      const response = await axios.get(url);
      dispatch(slice.actions.getCurrentBillSuccess({ data: response.data.data }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateInvoice(id, payload, navigate, enqueueSnackbar) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/invoices/${id}`;
      const data = {
        name: payload.name,
        status: payload.status,
        dueDate: payload.dueDate,
        detail: payload.detail,
        paymentTime: payload.completedDate
      };

      const response = await axios.put(url, data);
      navigate(`${PATH_SUPERVISOR.finances.root}/${id}`);
      enqueueSnackbar('Cập nhật hóa đơn thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createInvoice(payload, navigate, enqueueSnackbar) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/invoices/`;
      const data = {
        name: payload.name,
        status: payload.status,
        dueDate: payload.completedDate,
        detail: payload.detail,
        renterId: 1,
        invoiceTypeId: 1
      };
      const response = await axios.post(url, data);
      navigate(PATH_SUPERVISOR.finances.bill);
      enqueueSnackbar('Tạo hóa đơn thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
      dispatch(slice.actions.hasError(error));
    }
  };
}
