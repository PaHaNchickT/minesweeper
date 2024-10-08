'use client';

import { useEffect, type ReactElement } from 'react';
import { Provider } from 'react-redux';

import ControlPanel from '@/components/ControlPanel/ControlPanel';
import Field from '@/components/Field/Field';

import { store } from '../redux/store';

const App = (): ReactElement => {
  useEffect(() => {
    document.addEventListener('contextmenu', (event) => event.preventDefault());
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
      <Provider store={store}>
        <ControlPanel />
        <Field />
      </Provider>
    </div>
  );
};

export default App;
