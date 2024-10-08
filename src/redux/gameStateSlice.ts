import { createSlice } from '@reduxjs/toolkit';

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: { isGameOn: false },
  reducers: {
    startGame: (state) => {
      state.isGameOn = true;
    },
    endGame: (state) => {
      state.isGameOn = false;
    },
  },
});

export const { startGame, endGame } = gameStateSlice.actions;

export default gameStateSlice.reducer;
