'use client';

import { type ReactElement } from 'react';
import { Provider } from 'react-redux';

import Field from '@/components/Field/Field';

import { store } from '../redux/store';

const App = (): ReactElement => {
  return (
    <div className="flex flex-col justify-center w-full relative">
      <Provider store={store}>
        <Field />
      </Provider>
    </div>
  );
};

export default App;
