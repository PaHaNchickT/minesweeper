import { configureStore } from '@reduxjs/toolkit';

import fieldItemsReducer from './fieldItemsSlice';

export const store = configureStore({
  reducer: {
    fieldItems: fieldItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

