import type { ReactElement } from 'react';

import { TEXT_CONTENT } from '@/constants/constants';

export default function NotFound(): ReactElement {
  return (
    <div className="flex justify-center items-center h-screen text-center">
      <div className="flex flex-col z-[2]">
        <p className="text-4xl text-center">404</p>
        <p className="text-xl">{TEXT_CONTENT.errorMsg}</p>
      </div>
    </div>
  );
}
