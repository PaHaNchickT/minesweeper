'use client';

import { type ReactElement } from 'react';

import { TEXT_CONTENT } from '@/constants/constants';

const Header = (): ReactElement => {
  return (
    <header className="h-[70px] bg-[#c0c0c0] flex justify-center items-center">
      <p className="text-xl sm:text-3xl">{TEXT_CONTENT.headerTitle}</p>
    </header>
  );
};

export default Header;
