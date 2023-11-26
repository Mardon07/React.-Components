import React from 'react';
import { Provider } from 'react-redux';
import Detail from '../../../../Components/Detail';
import { store } from '../../../../src/store/store';

const PegeId = () => {
  return (
    <Provider store={store}>
      <Detail />
    </Provider>
  );
};

export default PegeId;
