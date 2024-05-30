import {configureStore } from '@reduxjs/toolkit';
import commentSlice from './CommentSlice';

const store = configureStore({
  reducer: {
    Comment: commentSlice.reducer
  },
});

export default store;


