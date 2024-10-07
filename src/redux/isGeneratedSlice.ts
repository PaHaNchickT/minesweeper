import { createSlice } from '@reduxjs/toolkit';

export const isGeneratedSlice = createSlice({
  name: 'isGenerated',
  initialState: {
    value: false,
  },
  reducers: {
    generateOn: (state) => {
      state.value = true;
    },
  },
});

export const { generateOn } = isGeneratedSlice.actions;

export default isGeneratedSlice.reducer;

