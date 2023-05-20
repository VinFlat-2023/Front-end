import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { PATH_SUPERVISOR } from 'src/routes/paths';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  contractList: [],
  total: 0,
  currentContract: null
};

const slice = createSlice({
  name: 'contract',
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

    getContractListSuccess(state, action) {
      state.isLoading = false;
      state.contractList = action.payload.contractList;
      state.total = action.payload.total;
    },

    resetContractList(state) {
      state.isLoading = false;
      state.contractList = [];
      state.total = 0;
    },

    getCurrentContractSuccess(state, action) {
      state.currentContract = action.payload.data;
    }
  }
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

export function getContractList(pageNumber, pageSize) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/contracts?PageNumber=${pageNumber ?? 1}&PageSize=${pageSize ?? 5}`
      const response = await axios.get(url);
      dispatch(
        slice.actions.getContractListSuccess({
          contractList: response.data.data,
          total: response.data.totalCount
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.resetContractList());
    }
  };
}

export function getContractById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/contracts/${id}`;
      const response = await axios.get(url);
      dispatch(slice.actions.getCurrentContractSuccess({ data: response.data.data }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createContractForNewUser(payload, navigate, enqueueSnackbar) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/contracts/sign`;
      const response = await axios.post(url, payload);
      navigate(PATH_SUPERVISOR.guest.listContract);
      enqueueSnackbar('Tạo hóa đơn thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createContractForExistingUser(id, payload, navigate, enqueueSnackbar) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/contracts/sign/renter/${id}`;
      const response = await axios.post(url, payload);
      navigate(PATH_SUPERVISOR.guest.listContract);
      enqueueSnackbar('Tạo hóa đơn thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateContract(id, payload, navigate, enqueueSnackbar) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `/contracts/${id}`;
      await axios.put(url, payload);
      navigate(PATH_SUPERVISOR.guest.listContract);
      enqueueSnackbar('Cập nhật hóa đơn thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
      dispatch(slice.actions.hasError(error));
    }
  };
}
