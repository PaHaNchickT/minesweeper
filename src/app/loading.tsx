import { Spinner } from '@nextui-org/react';
import { type ReactElement } from 'react';

const Loader = (): ReactElement => {
  return (
    <div className="bg-[#111111] w-screen max-w-full h-screen flex justify-center items-center">
      <Spinner color="warning" size="lg" />
    </div>
  );
};

export default Loader;
