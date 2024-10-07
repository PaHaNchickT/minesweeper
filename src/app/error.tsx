'use client';

import type { ReactElement } from 'react';

import { TEXT_CONTENT } from '@/constants/constants';
// import { Button } from '@nextui-org/react';

const Error = (): ReactElement => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 mt-4">
        <p className="text-xl">{TEXT_CONTENT.errorMsg}</p>
        {/* <Button onClick={() => router.push('/')}>{t('button')}</Button> */}
      </div>
    </div>
  );
};

export default Error;
