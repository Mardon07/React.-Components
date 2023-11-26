import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  term: string;
  page: number;
}
const initialState: CounterState = {
  term:
    (typeof window !== 'undefined' && localStorage.getItem('searchQuery')) ||
    '',
  page: 1,
};

export const counterSlice = createSlice({
  name: 'term',
  initialState,
  reducers: {
    getSearchTerm: (state, action: PayloadAction<string>) => {
      state.term = action.payload;
    },
    getCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { getSearchTerm } = counterSlice.actions;

export default counterSlice.reducer;
