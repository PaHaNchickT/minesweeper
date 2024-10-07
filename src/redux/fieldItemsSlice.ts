import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

export const fieldItemsSlice = createSlice({
  name: 'fieldItems',
  initialState: ['jopa', 'pizda'],
  reducers: {
    updateItem: (state, action) => {
      // state.value += action.payload;
      console.log(state, action);
    },
  },
});

export const { updateItem } = fieldItemsSlice.actions;

export default fieldItemsSlice.reducer;

