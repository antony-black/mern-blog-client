import axiosInstance from '../axios';

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});
