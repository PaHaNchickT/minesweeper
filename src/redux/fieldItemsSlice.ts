import { createSlice } from '@reduxjs/toolkit';

import type { TCell } from '@/types/types';
// import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: TCell[] = [
  { isBomb: true, isClicked: false, isFlag: false, innerText: '💣' },
  { isBomb: false, isClicked: false, isFlag: false, innerText: 1 },
  { isBomb: false, isClicked: false, isFlag: false, innerText: 0 },
  { isBomb: false, isClicked: false, isFlag: false, innerText: 2 },
  { isBomb: false, isClicked: false, isFlag: false, innerText: 2 },
  { isBomb: false, isClicked: false, isFlag: false, innerText: 1 },
  { isBomb: false, isClicked: false, isFlag: false, innerText: 1 },
  { isBomb: true, isClicked: false, isFlag: false, innerText: '💣' },
  { isBomb: false, isClicked: false, isFlag: false, innerText: 1 },
];

export const fieldItemsSlice = createSlice({
  name: 'fieldItems',
  initialState: initialState,
  reducers: {
    updateItem: (state, action) => {
      // state.value += action.payload;
      console.log(state, action);
    },
  },
});

export const { updateItem } = fieldItemsSlice.actions;

export default fieldItemsSlice.reducer;

