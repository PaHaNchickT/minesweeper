'use client';

import { Button } from '@nextui-org/react';
import type { ReactElement } from 'react';

import { TEXT_CONTENT } from '@/constants/constants';

const Error = (): ReactElement => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-4 mt-4">
        <p className="text-center text-xl">{TEXT_CONTENT.errorMsg}</p>
        <Button onClick={() => location.reload()}>{TEXT_CONTENT.reloadBtn}</Button>
      </div>
    </div>
  );
};

export default Error;
