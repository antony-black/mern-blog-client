import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../axios';
import { Status } from '../../consts/status';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axiosInstance.get('/posts/all');
  return data;
});

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const { data } = await axiosInstance.get('/tags');
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: Status.LOADING,
  },
  tags: {
    items: [],
    status: Status.LOADING,
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.status = Status.LOADING;
        state.posts.items = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.status = Status.SUCCESS;
        state.posts.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.status = Status.ERROR;
        state.posts.items = [];
      })
      .addCase(fetchTags.pending, (state) => {
        state.tags.status = Status.LOADING;
        state.tags.items = [];
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.status = Status.SUCCESS;
        state.tags.items = action.payload;
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.status = Status.ERROR;
        state.tags.items = [];
      });
  },
});

export const { addPost, removePost, updatePost } = postsSlice.actions;

export const selectPostsData = (state) => state.posts;

export default postsSlice.reducer;
