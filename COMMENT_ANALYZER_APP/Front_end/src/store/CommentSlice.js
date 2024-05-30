import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: 'Comment',
  initialState: {
    comments:[],
  },
  reducers: {
    add(state,action) {  
      state.comments = action.payload
    }
  },
});

export default commentSlice;
export const { add } = commentSlice.actions;