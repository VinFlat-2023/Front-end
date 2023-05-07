import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  invoiceList: [],
  invoiceTotal: 0
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
