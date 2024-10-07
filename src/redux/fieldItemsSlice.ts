import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { TCell } from '@/types/types';
import { initFieldGen } from '@/utils/initFieldGen';

export const fieldItemsSlice = createSlice({
  name: 'fieldItems',
  initialState: { value: initFieldGen() },
  reducers: {
    updateItem: (state, action: PayloadAction<{ item: TCell; indexX: number; indexY: number }>) => {
      state.value[action.payload.indexY][action.payload.indexX] = action.payload.item;
    },
    updateField: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateItem, updateField } = fieldItemsSlice.actions;

export default fieldItemsSlice.reducer;

