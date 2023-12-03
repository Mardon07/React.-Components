import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean | undefined;
  picture?: string | ArrayBuffer | undefined;
  country: string;
}

export interface FormState {
  data: FormData;
}

const initialState: FormState = {
  data: {} as FormData,
};

export const FormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    getData: (state, action: PayloadAction<FormData>) => {
      state.data = action.payload;
    },
  },
});

export const { getData } = FormSlice.actions;

export default FormSlice.reducer;
