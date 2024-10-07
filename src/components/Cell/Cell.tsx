'use client';

import { Button } from '@nextui-org/react';
import type { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { updateItem } from '@/redux/fieldItemsSlice';
import type { TCell } from '@/types/types';

const Cell = (props: { item: TCell; index: number }): ReactElement => {
  const dispatch = useDispatch();

  const clickHandler = (): void => {
    dispatch(
      updateItem({
        item: Object.assign(JSON.parse(JSON.stringify(props.item)), { isClicked: true }),
        index: props.index,
      }),
    );
  };

  return (
    <Button className="w-[27px] h-[27px] bg-[#699] p-0 min-w-0 rounded-none" onPress={clickHandler}>
      {props.item.isClicked ? props.item.innerText.toString() : 'x'}
    </Button>
  );
};

export default Cell;
