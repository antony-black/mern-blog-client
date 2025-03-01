import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Status } from '../../consts/status';
import axiosInstance from '../../axios';

export const fetchAuthData = createAsyncThunk('auth/fetchAuthData', async (params) => {
  const { data } = await axiosInstance.post('/auth/login', params);

  return data;
});

export const fetchRegistrationData = createAsyncThunk(
  'auth/fetchRegistrationData',
  async (params) => {
    const { data } = await axiosInstance.post('/auth/register', params);

    return data;
  },
);

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async () => {
  const { data } = await axiosInstance.get('/auth/info');

  return data;
});

const initialState = {
  // isAuth: Boolean(localStorage.getItem('token')),
  isAuth: false,
  authData: null,
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.authData = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthData.pending, (state) => {
        state.status = Status.LOADING;
        state.authData = null;
        state.isAuth = false;
      })
      .addCase(fetchAuthData.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.authData = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchAuthData.rejected, (state) => {
        state.status = Status.ERROR;
        state.authData = null;
        state.isAuth = false;
      })
      .addCase(fetchRegistrationData.pending, (state) => {
        state.status = Status.LOADING;
        state.authData = null;
        state.isAuth = false;
      })
      .addCase(fetchRegistrationData.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.authData = action.payload;
        state.isAuth = false;
      })
      .addCase(fetchRegistrationData.rejected, (state) => {
        state.status = Status.ERROR;
        state.authData = null;
        state.isAuth = false;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.status = Status.LOADING;
        state.authData = null;
        state.isAuth = false;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.authData = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = Status.ERROR;
        state.authData = null;
        state.isAuth = false;
      });
  },
});

export const selectAuthData = (state) => state.auth;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
