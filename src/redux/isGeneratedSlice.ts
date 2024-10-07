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
    generateOff: (state) => {
      state.value = false;
    },
  },
});

export const { generateOn, generateOff } = isGeneratedSlice.actions;

export default isGeneratedSlice.reducer;

