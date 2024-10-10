import { createSlice } from '@reduxjs/toolkit';

export const isGeneratedSlice = createSlice({
  name: 'isGenerated',
  initialState: {
    value: false,
  },
  reducers: {
    generationOn: (state) => {
      state.value = true;
    },
    generationOff: (state) => {
      state.value = false;
    },
  },
});

export const { generationOn, generationOff } = isGeneratedSlice.actions;

export default isGeneratedSlice.reducer;
