import { createSlice } from '@reduxjs/toolkit';

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: { isGameStarted: false, isGameEnded: false, flagsCount: 0, isWin: false, clickStatus: '🙂' },
  reducers: {
    clearGame: (state) => {
      state.isGameStarted = false;
      state.isGameEnded = false;
    },
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
    updateClickStatus: (state, action) => {
      state.clickStatus = action.payload;
    },
  },
});

export const { clearGame, startGame, endGame, toggleFlag, clearFlags, updateClickStatus } = gameStateSlice.actions;

export default gameStateSlice.reducer;
