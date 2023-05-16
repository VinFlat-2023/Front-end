import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  buildingList: [],
  total: 0,
  currentBuilding: null
};

const slice = createSlice({
  name: 'building',
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

    getBuildingListSuccess(state, action) {
      state.isLoading = false;
      state.buildingList = action.payload.buildingList;
      state.total = action.payload.total;
    },
    getCurrentBuildingSuccess(state, action) {
      state.isLoading = false;
      state.currentBuilding = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

export function getCurrentBuilding() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/buildings/current');
      dispatch(slice.actions.getCurrentBuildingSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
