import { configureStore } from '@reduxjs/toolkit';
import formReducer from './form/formSlice';
import countryReducer from './country/countrySlice';
export const store = configureStore({
  reducer: {
    form: formReducer,
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
