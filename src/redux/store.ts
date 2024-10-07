import { configureStore } from '@reduxjs/toolkit';

import fieldItemsReducer from './fieldItemsSlice';
import isGeneratedReducer from './isGeneratedSlice';

export const store = configureStore({
  reducer: {
    fieldItems: fieldItemsReducer,
    isGenerated: isGeneratedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

