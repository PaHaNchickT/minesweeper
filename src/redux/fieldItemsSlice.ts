import { createSlice } from '@reduxjs/toolkit';

import { initFieldGen } from '@/utils/initFieldGen';

export const fieldItemsSlice = createSlice({
  name: 'fieldItems',
  initialState: { value: initFieldGen() },
  reducers: {
    updateItem: (state, action) => {
      const tempItem = JSON.parse(JSON.stringify(state.value[action.payload.indexY][action.payload.indexX]));
      state.value[action.payload.indexY][action.payload.indexX] = Object.assign(tempItem, { isClicked: true });
    },
    updateField: (state, action) => {
      state.value = action.payload;
    },
    clearField: (state) => {
      state.value = initFieldGen();
    },
  },
});

export const { updateItem, updateField, clearField } = fieldItemsSlice.actions;

export default fieldItemsSlice.reducer;
