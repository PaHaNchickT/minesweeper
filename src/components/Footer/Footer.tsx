'use client';

import Link from 'next/link';
import type { ReactElement } from 'react';

export const Footer = (): ReactElement => {
  return (
    <footer className="bg-[#c0c0c0] gap-2 flex flex-col flex-wrap justify-center items-center text-xs p-5 relative md:text-sm sm:flex-row sm:justify-between sm:flex-row">
      <p>Made by Pavel Terno</p>
      <p className=" w-[62px]  relative left-0 sm:absolute sm:text-center sm:left-[calc((100%-62px)/2)]">2024</p>
      <Link href="https://ternopavel.ru/" target="_blank">
        More works here:
      </Link>
    </footer>
  );
};

export default Footer;
