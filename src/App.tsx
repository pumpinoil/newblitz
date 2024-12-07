import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Designer from './pages/Designer';

export default function App() {
  return (
    <Provider store={store}>
      <Designer />
    </Provider>
  );
}