'use client';

import { type ReactElement } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/redux/store';

import Cell from '../Cell/Cell';

const Field = (): ReactElement => {
  const fieldItems = useSelector((state: RootState) => state.fieldItems);

  return (
    <div className="w-[81px] h-[81px] flex flex-wrap">
      {fieldItems.map((item, index) => (
        <Cell key={index} item={item} index={index} />
      ))}
    </div>
  );
};

export default Field;
