'use client';

import { useDisclosure } from '@nextui-org/react';
import { useEffect, type ReactElement } from 'react';
import { Provider } from 'react-redux';

import ControlPanel from '@/components/ControlPanel/ControlPanel';
import Field from '@/components/Field/Field';
import ModalWindow from '@/components/ModalWindow/ModalWindow';

import { store } from '../redux/store';

const App = (): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    document.addEventListener('contextmenu', (event) => event.preventDefault());
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
      <Provider store={store}>
        <ControlPanel />
        <Field onOpen={onOpen}/>
        <ModalWindow isOpen={isOpen} onClose={onClose} />
      </Provider>
    </div>
  );
};

export default App;
