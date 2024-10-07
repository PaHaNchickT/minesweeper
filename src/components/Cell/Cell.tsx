'use client';

import type { ReactElement } from 'react';

import type { TCell } from '@/types/types';

const Cell = (props: { item: TCell }): ReactElement => {
  return <div className="w-[27px] h-[27px] bg-[#699]">{props.item.innerText.toString()}</div>;
};

export default Cell;
