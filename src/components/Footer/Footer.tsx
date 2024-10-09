'use client';

import Link from 'next/link';
import type { ReactElement } from 'react';

export const Footer = (): ReactElement => {
  return (
    <footer className="h-[70px] bg-[#c0c0c0] flex justify-between items-center text-sm px-5 relative">
      <p>Made by Pavel Terno</p>
      <p className="absolute w-[62px] text-center left-[calc((100%-62px)/2)]">2024</p>
      <Link href="https://ternopavel.ru/" target="_blank">
        More works here:
      </Link>
    </footer>
  );
};

export default Footer;
