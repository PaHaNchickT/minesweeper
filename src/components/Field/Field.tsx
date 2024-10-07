'use client';

import type { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/redux/store';

const Field = (): ReactElement => {
  const test = useSelector((state: RootState) => state.fieldItems);
  console.log(test);

  return <p>Test</p>;
};

export default Field;
