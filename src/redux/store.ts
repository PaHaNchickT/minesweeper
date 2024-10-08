import { configureStore } from '@reduxjs/toolkit';

import fieldItemsReducer from './fieldItemsSlice';
import gameStateReducer from './gameStateSlice';
import isGeneratedReducer from './isGeneratedSlice';

export const store = configureStore({
  reducer: {
    fieldItems: fieldItemsReducer,
    isGenerated: isGeneratedReducer,
    gameState: gameStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

