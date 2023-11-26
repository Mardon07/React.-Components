import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';

export default function Page() {
  return (
    <Provider store={store}>
      <></>
    </Provider>
  );
}
