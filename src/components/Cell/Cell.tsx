'use client';

import { Button } from '@nextui-org/react';
import type { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { updateField, updateItem } from '@/redux/fieldItemsSlice';
import { generationOn } from '@/redux/isGeneratedSlice';
import type { RootState } from '@/redux/store';
import type { TCell } from '@/types/types';
import { closeCellsRadius } from '@/utils/closeCellsRadius';
import { fieldGen } from '@/utils/fieldGen';

const Cell = (props: { item: TCell; indexX: number; indexY: number }): ReactElement => {
  const dispatch = useDispatch();
  const isGenerated = useSelector((state: RootState) => state.isGenerated.value);
  const fieldItems = useSelector((state: RootState) => state.fieldItems.value);

  const firstClick = (): void => {
    dispatch(updateField(fieldGen({ x: props.indexX, y: props.indexY })));
    dispatch(generationOn());
  };

  const clickHandler = (): void => {
    if (!isGenerated) {
      firstClick();
    } else if (!props.item.isClicked) {
      closeCellsRadius(props.indexX, props.indexY, fieldItems).forEach((cell) => {
        dispatch(
          updateItem({
            item: { isClicked: true },
            indexX: cell.x,
            indexY: cell.y,
          }),
        );
      });
    }

    dispatch(
      updateItem({
        item: { isClicked: true },
        indexX: props.indexX,
        indexY: props.indexY,
      }),
    );
  };

  return (
    <Button
      className={`w-[27px] h-[27px] p-0 min-w-0 rounded-none box-border ${props.item.isClicked ? 'bg-warning' : 'bg-[#699]'}`}
      onPress={clickHandler}
    >
      {/* {props.item.isClicked ? props.item.innerText.toString() : 'x'} */}
      {props.item.innerText.toString()}
    </Button>
  );
};

export default Cell;
