'use client';

import { Spinner, useDisclosure } from '@nextui-org/react';
import { useEffect, useState, type ReactElement } from 'react';
import { Provider } from 'react-redux';

import ControlPanel from '@/components/ControlPanel/ControlPanel';
import Field from '@/components/Field/Field';
import ModalWindow from '@/components/ModalWindow/ModalWindow';

import { store } from '../redux/store';

const App = (): ReactElement => {
  const [mounted, setMounted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setMounted(true);
    document.addEventListener('contextmenu', (event) => event.preventDefault());
  }, []);

  return (
    <>
      {mounted ? (
        <main className="flex justify-center">
          <Provider store={store}>
            <div className="flex flex-col gap-2 justify-center items-center bg-[#bdbdbd] p-2 box-border border-3 border-l-white border-t-white border-r-[#808080] border-b-[#808080] sm:border-4">
              <ControlPanel />
              <Field onOpen={onOpen} />
            </div>
            <ModalWindow isOpen={isOpen} onClose={onClose} />
          </Provider>
        </main>
      ) : (
        <Spinner color="danger" size="lg" />
      )}
    </>
  );
};

export default App;
