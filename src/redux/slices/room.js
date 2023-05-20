import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  roomList: [],
  total: 0,
  roomInFlats: []
};

const slice = createSlice({
  name: 'room',
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

    getRoomListSuccess(state, action) {
      state.isLoading = false;
      state.roomList = action.payload.roomList;
      state.total = action.payload.total;
    },
    getRoomInFlatSuccess(state, action) {
      state.isLoading = false;
      state.roomInFlats = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

export function getRoomList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/building/room');
      dispatch(
        slice.actions.getRoomListSuccess({
          roomList: response.data.data,
          total: response.data.totalCount
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRoomByFlatId(flatId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const url = `building/room/flat/${flatId}/rooms`;
    try {
      const response = await axios.get(url);
      dispatch(slice.actions.getRoomInFlatSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
