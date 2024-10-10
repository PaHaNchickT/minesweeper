'use client';

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';

import { TEXT_CONTENT } from '@/constants/constants';

export default function NotFound(): ReactElement {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen text-center">
      <div className="flex flex-col z-[2] gap-5 items-center">
        <div>
          <p className="text-3xl text-center sm:text-4xl">404</p>
          <p className="text-sm sm:text-xl">{TEXT_CONTENT.notFoundMsg}</p>
        </div>
        <Button onClick={() => router.push('/')}>{TEXT_CONTENT.homeBtn}</Button>
      </div>
    </div>
  );
}
