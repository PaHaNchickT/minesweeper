'use client';

import { type ReactElement } from 'react';
import { Provider } from 'react-redux';

import Field from '@/components/Field/Field';

import { store } from '../redux/store';

const App = (): ReactElement => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Provider store={store}>
        <Field />
      </Provider>
    </div>
  );
};

export default App;
