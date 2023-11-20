import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  term: string;
}

const initialState: CounterState = {
  term: localStorage.getItem('searchQuery') || '',
};

export const counterSlice = createSlice({
  name: 'term',
  initialState,
  reducers: {
    getSearchTerm: (state, action: PayloadAction<string>) => {
      state.term = action.payload;
    },
  },
});

export const { getSearchTerm } = counterSlice.actions;

export default counterSlice.reducer;
