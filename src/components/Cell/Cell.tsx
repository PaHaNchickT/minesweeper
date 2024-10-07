'use client';

import { Button } from '@nextui-org/react';
import type { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { updateField } from '@/redux/fieldItemsSlice';
import { generateOn } from '@/redux/isGeneratedSlice';
import type { RootState } from '@/redux/store';
import type { TCell } from '@/types/types';
import { fieldGen } from '@/utils/fieldGen';

const Cell = (props: { item: TCell; indexX: number; indexY: number }): ReactElement => {
  const dispatch = useDispatch();
  const isGenerated = useSelector((state: RootState) => state.isGenerated.value);

  const clickHandler = (): void => {
    // first click
    if (!isGenerated) {
      dispatch(updateField(fieldGen({ x: props.indexX, y: props.indexY })));
      dispatch(generateOn());
    }

    // dispatch(
    //   updateItem({
    //     item: Object.assign(itemCopy, { isClicked: true }),
    //     indexX: props.indexX,
    //     indexY: props.indexY,
    //   }),
    // );
  };

  return (
    <Button className="w-[27px] h-[27px] bg-[#699] p-0 min-w-0 rounded-none box-border" onPress={clickHandler}>
      {/* {props.item.isClicked ? props.item.innerText.toString() : 'x'} */}
      {props.item.innerText.toString()}
    </Button>
  );
};

export default Cell;
