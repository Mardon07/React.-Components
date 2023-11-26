import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import ErrorBoundary from '../src/ErrorBoundary';
import '../src/index.css';
import SearchApp from '../Components/SearchApp';
import { store } from '../src/store/store';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <SearchApp>
          <Component {...pageProps} />
        </SearchApp>
      </Provider>
    </ErrorBoundary>
  );
}
