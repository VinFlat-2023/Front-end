import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  roomList: [],
  total: 0,
  roomInFlats: [],
  currentRoom: null,
  roomTypeList: []
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
    },

    getCurrentRoomSuccess(state, action) {
      state.isLoading = false;
      state.currentRoom = action.payload;
    },
    getRoomTypeListSuccess(state, action) {
      state.isLoading = false;
      state.roomTypeList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

export function getRoomList(pageNumber, pageSize) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `building/room?PageNumber=${pageNumber ?? 1}&PageSize=${pageSize ?? 5}`;
      const response = await axios.get(url);
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

export function getRoomById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const url = `building/room/${id}`;
    try {
      const response = await axios.get(url);
      dispatch(slice.actions.getCurrentRoomSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRoomType(pageNumber, pageSize) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const url = `/building/room-type?PageNumber=${pageNumber ?? 1}&PageSize=${pageSize ?? 25}`;
    try {
      const response = await axios.get(url);
      dispatch(slice.actions.getRoomTypeListSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
