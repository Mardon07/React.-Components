import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/result.slice';

export const store = configureStore({
  reducer: {
    results: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
