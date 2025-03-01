import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../redux/slices/posts';
import authReducer from '../redux/slices/auth';

const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
  },
});

export default store;
