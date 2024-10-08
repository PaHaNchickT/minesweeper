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

  let cellText = '';

  const firstClick = (): void => {
    dispatch(updateField(fieldGen({ x: props.indexX, y: props.indexY })));
    dispatch(generationOn());
  };

  const clickHandler = (): void => {
    if (props.item.isFlag) return;

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

  const contextHandler = (): void => {
    if (props.item.isClicked) return;

    dispatch(
      updateItem({
        item: props.item.isFlag ? { isFlag: false } : { isFlag: true },
        indexX: props.indexX,
        indexY: props.indexY,
      }),
    );
  };

  if (props.item.isClicked) cellText = props.item.innerText.toString();
  if (props.item.isFlag) cellText = '🚩';

  return (
    <Button
      className={`w-[27px] h-[27px] p-0 min-w-0 rounded-none box-border ${props.item.isClicked ? 'bg-warning' : 'bg-[#699]'}`}
      onPress={clickHandler}
      onContextMenu={contextHandler}
    >
      {cellText}
    </Button>
  );
};

export default Cell;
