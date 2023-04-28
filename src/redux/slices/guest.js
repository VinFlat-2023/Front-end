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