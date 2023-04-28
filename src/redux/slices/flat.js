import { createSlice } from '@reduxjs/toolkit';
import { omit } from 'lodash';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  flatTypeList: [],
  total: 0,
};

const slice = createSlice({
  name: 'flat',
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

    getFlatListSuccess(state, action) {
        console.log("action", action);
        state.isLoading = false;
        state.flatTypeList = action.payload.flatList;
        state.total = action.payload.total;
    },
  }
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

export function getFlatTypeList(pageNumber, pageSize) {
    return async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await axios.get(`/flats?PageNumber=${pageNumber ?? 1}&PageSize=${pageSize ?? 5}`);
        dispatch(
          slice.actions.getFlatListSuccess({
            flatList: response.data.data,
            total: response.data.totalCount
          })
        );
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }