import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FormState {
  data: object;
}

const initialState: FormState = {
  data: {},
};

export const FormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    getData: (state, action: PayloadAction<object>) => {
      state.data = action.payload;
    },
  },
});

export const { getData } = FormSlice.actions;

export default FormSlice.reducer;
