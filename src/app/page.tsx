'use client';

import type { MutableRefObject } from 'react';
import { useEffect, useRef, type ReactElement } from 'react';

const Home = (): ReactElement => {
  const elementRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (window && window.location.hash === '#work') elementRef.current.scrollIntoView();
  }, []);

  return (
    <div className="flex flex-col justify-center w-full relative">
      <p>Test</p>
    </div>
  );
};

export default Home;
