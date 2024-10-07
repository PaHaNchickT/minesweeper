'use client';

import { type ReactElement } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/redux/store';

import Cell from '../Cell/Cell';

const Field = (): ReactElement => {
  const fieldItems = useSelector((state: RootState) => state.fieldItems.value);

  return (
    <div className={`w-[432px] h-[432px] flex flex-wrap`}>
      {fieldItems.map((item, indexY) =>
        item.map((subItem, indexX) => <Cell key={indexX + indexY} item={subItem} indexX={indexX} indexY={indexY} />),
      )}
    </div>
  );
};

export default Field;
