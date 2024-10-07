'use client';

import { Button } from '@nextui-org/react';
import type { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { updateItem } from '@/redux/fieldItemsSlice';
import { generateOn } from '@/redux/isGeneratedSlice';
import type { RootState } from '@/redux/store';
import type { TCell } from '@/types/types';
import { fieldGen } from '@/utils/fieldGen';

const fieldSize = 3;

const Cell = (props: { item: TCell; indexX: number; indexY: number }): ReactElement => {
  const itemCopy = JSON.parse(JSON.stringify(props.item));

  const dispatch = useDispatch();
  const isGenerated = useSelector((state: RootState) => state.isGenerated.value);

  const clickHandler = (): void => {
    // first click
    if (!isGenerated) {
      fieldGen(props.indexX, fieldSize);
      dispatch(generateOn());
    }

    dispatch(
      updateItem({
        item: Object.assign(itemCopy, { isClicked: true }),
        indexX: props.indexX,
        indexY: props.indexY,
      }),
    );
  };

  return (
    <Button className="w-[27px] h-[27px] bg-[#699] p-0 min-w-0 rounded-none" onPress={clickHandler}>
      {/* {props.item.isClicked ? props.item.innerText.toString() : 'x'} */}
      {props.item.innerText.toString()}
    </Button>
  );
};

export default Cell;
