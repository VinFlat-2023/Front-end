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
      console.log('action ',action)
      state.isLoading = false;
      state.invoiceList = action.payload.invoiceList;
      state.invoiceTotal = action.payload.total;
    }
  }
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

export function getInvoiceList(pageNumber, pageSize, status) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = status
        ? `/invoices?PageNumber=${pageNumber ?? 1}&PageSize=${pageSize ?? 5}&Status=${status}`
        : `/invoices?PageNumber=${pageNumber ?? 1}&PageSize=${pageSize ?? 5}`;
      const response = await axios.get(url);
      console.log("url", url);
      dispatch(
        slice.actions.getInvoiceListSuccess({
          invoiceList: response.data.data,
          total: response.data.totalCount
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
