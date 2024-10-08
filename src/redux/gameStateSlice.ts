import { createSlice } from '@reduxjs/toolkit';

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: { isGameStarted: false, isGameEnded: false },
  reducers: {
    startGame: (state) => {
      state.isGameStarted = true;
      state.isGameEnded = false;
    },
    endGame: (state) => {
      state.isGameStarted = false;
      state.isGameEnded = true;
    },
  },
});

export const { startGame, endGame } = gameStateSlice.actions;

export default gameStateSlice.reducer;
