import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CountryName {
  name: string;
}

export interface CountryState {
  countries: CountryName[];
}

const initialState: CountryState = {
  countries: [
    { name: 'USA' },
    { name: 'Canada' },
    { name: 'United Kingdom' },
    { name: 'Germany' },
    { name: 'France' },
  ],
};

export const CountrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    getCountrys: (state, action: PayloadAction<CountryName[]>) => {
      state.countries = action.payload;
    },
  },
});

export const { getCountrys } = CountrySlice.actions;

export default CountrySlice.reducer;
