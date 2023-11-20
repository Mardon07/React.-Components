import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '../../types/types';

export interface CounterState {
  results: SearchResult[];
  loading: boolean;
}

const initialState: CounterState = {
  results: [],
  loading: true,
};

export const counterSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    getPeoples: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { getPeoples, setLoading } = counterSlice.actions;

export default counterSlice.reducer;
