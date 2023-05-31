import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { PATH_SUPERVISOR } from 'src/routes/paths';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  flatTypeList: [],
  activeFlats: [],
  flatTypeTotal: 0,
  currentFlat: null,
  currentFlatName: null,
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
    getActiveFlatsSuccess(state, action) {
      state.isLoading = false;
      state.activeFlats = action.payload;
    },
    getFlatTypeListSuccess(state, action) {
      state.isLoading = false;
      state.flatTypeList = action.payload;
    },
    getFlatSuccess(state, action){
      state.isLoading = false;
      state.currentFlat = action.payload;
      state.currentFlatName = action.payload.Name;
    }
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

export function getFlatById(id){
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try{
      const response = await axios.get(`/flats/${id}`);
      dispatch(slice.actions.getFlatSuccess(response.data.data));
    } catch(error){
      dispatch(slice.actions.hasError(error));
    }
  }
}


export function getActiveFlats() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = '/flats/active';
      const response = await axios.get(url);
      dispatch(slice.actions.getActiveFlatsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getFlatTypes(pageNumber, pageSize) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `flats/type?PageNumber=${pageNumber ?? 1}&PageSize=${pageSize ?? 25}`;
      const response = await axios.get(url);
      const activeFlatType = response.data.data.filter(item => !!item.Status)
      dispatch(slice.actions.getFlatTypeListSuccess(activeFlatType));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createFlat(payload, enqueueSnackbar, navigate) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `flats`;
      await axios.post(url, payload);
      enqueueSnackbar("Tạo căn hộ thành công", { variant: 'success' });
      navigate(PATH_SUPERVISOR.room.listFlat);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateFlat(flatId, payload, enqueueSnackbar){
  return async(dispatch)=>{
    dispatch(slice.actions.startLoading());
    try{
      const url = `flats/${flatId}`;
      await axios.put(url, payload);
      enqueueSnackbar("Cập nhật thông tin căn hộ thành công", { variant: 'success' });      
    } catch(error){
      enqueueSnackbar(error.message, { variant: 'error' });
      dispatch(slice.actions.hasError(error));
    }
  }
}

