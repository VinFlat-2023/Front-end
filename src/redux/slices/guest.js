import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  guestList: [],
  guestTotal: 0,
  guestWithoutContract: [],
  currentGuest: null,
};

const slice = createSlice({
  name: 'guest',
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

    getGuestListSuccess(state, action) {
      state.isLoading = false;
      state.guestList = action.payload.renterList;
      state.guestTotal = action.payload.total;
    },

    getGuestWithoutContract(state, action) {
      state.isLoading = false;
      state.guestWithoutContract = action.payload;
    },

    getGuestSuccess(state, action) {
      state.isLoading = false;
      state.currentGuest = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

export function getGuestList(pageNumber, pageSize) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/renters?PageNumber=${pageNumber ?? 1}&PageSize=${pageSize ?? 5}`);
      dispatch(
        slice.actions.getGuestListSuccess({
          renterList: response.data.data,
          total: response.data.totalCount
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getGuestWithoutContract() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const url = '/renters/contract/inactive';
      const response = await axios.get(url);
      dispatch(slice.actions.getGuestWithoutContract(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function getGuestById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const url = `/renters/${id}`;
      const response = await axios.get(url);
      dispatch(slice.actions.getGuestSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateRenterStatus(id, status,enqueueSnackbar) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const url = `/renters/${id}`;
      await axios.put(url, status);
      enqueueSnackbar("Cập nhật trạng thái khách thuê thành công" , { variant: 'success' })
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra" , { variant: 'error' })
      dispatch(slice.actions.hasError(error));
    }
  };
}

