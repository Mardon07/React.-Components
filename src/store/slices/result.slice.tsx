import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '../../types/types';

export interface CounterState {
  results: SearchResult[];
}

const initialState: CounterState = {
  results: [],
};

export const counterSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    getPeoples: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getPeoples } = counterSlice.actions;

export default counterSlice.reducer;
