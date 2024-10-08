import { createSlice } from '@reduxjs/toolkit';

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: { isGameStarted: false, isGameEnded: false, flagsCount: 0, isWin: false },
  reducers: {
    startGame: (state) => {
      state.isGameStarted = true;
      state.isGameEnded = false;
    },
    endGame: (state, action) => {
      state.isWin = action.payload;
      state.isGameStarted = false;
      state.isGameEnded = true;
    },
    toggleFlag: (state, action) => {
      const oldValue = state.flagsCount;
      state.flagsCount = action.payload ? oldValue + 1 : oldValue - 1;
    },
    clearFlags: (state) => {
      state.flagsCount = 0;
    },
  },
});

export const { startGame, endGame, toggleFlag, clearFlags } = gameStateSlice.actions;

export default gameStateSlice.reducer;
