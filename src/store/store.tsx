import { configureStore } from '@reduxjs/toolkit';
import { swapiApi } from './api/apiSlices';
import resultReducer from './slices/result.slice';
import termReducer from './slices/searchTerm.slice';

export const store = configureStore({
  reducer: {
    results: resultReducer,
    searchTerm: termReducer,
    [swapiApi.reducerPath]: swapiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swapiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
