import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { TCell } from '@/types/types';

const initialState: TCell[][] = [
  [
    { isBomb: true, isClicked: false, isFlag: false, innerText: '💣' },
    { isBomb: false, isClicked: false, isFlag: false, innerText: 1 },
    { isBomb: false, isClicked: false, isFlag: false, innerText: 0 },
  ],
  [
    { isBomb: false, isClicked: false, isFlag: false, innerText: 2 },
    { isBomb: false, isClicked: false, isFlag: false, innerText: 2 },
    { isBomb: false, isClicked: false, isFlag: false, innerText: 1 },
  ],
  [
    { isBomb: false, isClicked: false, isFlag: false, innerText: 1 },
    { isBomb: true, isClicked: false, isFlag: false, innerText: '💣' },
    { isBomb: false, isClicked: false, isFlag: false, innerText: 1 },
  ],
];

export const fieldItemsSlice = createSlice({
  name: 'fieldItems',
  initialState: initialState,
  reducers: {
    updateItem: (state, action: PayloadAction<{ item: TCell; indexX: number; indexY: number }>) => {
      state[action.payload.indexY][action.payload.indexX] = action.payload.item;
    },
  },
});

export const { updateItem } = fieldItemsSlice.actions;

export default fieldItemsSlice.reducer;

