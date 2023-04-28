import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  flatTypeList: [],
  flatTypeTotal: 0,
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

    getFlatListSuccess(state, action) {
        state.isLoading = false;
        state.flatList = action.payload.flatList;
        state.flatTotal = action.payload.total;
    },
  }
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

export function getFlatList(pageNumber, pageSize) {
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