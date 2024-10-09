'use client';

import { Button } from '@nextui-org/react';
import type { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { updateField, updateItem } from '@/redux/fieldItemsSlice';
import { endGame, startGame, toggleFlag, updateClickStatus } from '@/redux/gameStateSlice';
import { generationOn } from '@/redux/isGeneratedSlice';
import type { RootState } from '@/redux/store';
import type { TCell } from '@/types/types';
import { bombsShowing } from '@/utils/bombsShowing';
import { closeCellsRadius } from '@/utils/closeCellsRadius';
import { fieldGen } from '@/utils/fieldGen';
import { openCellsRadius } from '@/utils/openCellsRadius';

const Cell = (props: { item: TCell; currentPos: { x: number; y: number }; onOpen: () => void }): ReactElement => {
  const dispatch = useDispatch();
  const isGenerated = useSelector((state: RootState) => state.isGenerated.value);
  const fieldItems = useSelector((state: RootState) => state.fieldItems.value);
  const isGameEnded = useSelector((state: RootState) => state.gameState.isGameEnded);

  let cellText = '';

  const cellUpdating = (item: { [key: string]: boolean }, indexX: number, indexY: number): void => {
    dispatch(
      updateItem({
        item,
        indexX,
        indexY,
      }),
    );
  };

  const firstClick = (): void => {
    dispatch(updateField(fieldGen({ x: props.currentPos.x, y: props.currentPos.y })));
    dispatch(generationOn());
    dispatch(startGame());
  };

  const gameOver = (): void => {
    props.onOpen();

    dispatch(endGame(false));
    dispatch(updateClickStatus('😵'));

    bombsShowing(fieldItems).forEach((cell) => {
      cellUpdating({ isClicked: true }, cell.x, cell.y);
    });
  };

  const clickHandler = (): void => {
    if (props.item.isBomb && !props.item.isFlag) gameOver();
    if (props.item.isFlag) return;

    if (!isGenerated) {
      firstClick();
    } else if (!props.item.isClicked) {
      closeCellsRadius(props.currentPos.x, props.currentPos.y, fieldItems).forEach((cell) => {
        cellUpdating({ isClicked: true }, cell.x, cell.y);
      });
    } else if (props.item.isClicked && props.item.innerText && typeof props.item.innerText === 'number') {
      openCellsRadius(props.currentPos.x, props.currentPos.y, fieldItems).forEach((cell) => {
        if (fieldItems[cell.y][cell.x].isBomb) gameOver();

        cellUpdating({ isClicked: true }, cell.x, cell.y);
      });
    }

    cellUpdating({ isClicked: true }, props.currentPos.x, props.currentPos.y);
  };

  const contextHandler = (): void => {
    if (props.item.isClicked) return;

    cellUpdating(props.item.isFlag ? { isFlag: false } : { isFlag: true }, props.currentPos.x, props.currentPos.y);
    dispatch(toggleFlag(props.item.isFlag ? false : true));
  };

  const clickStartHandler = (): void => {
    dispatch(updateClickStatus('😮'));
  };

  const clickEndHandler = (): void => {
    dispatch(updateClickStatus('🙂'));
  };

  if (props.item.isClicked) cellText = props.item.innerText.toString();
  if (props.item.isFlag) cellText = '🚩';

  return (
    <Button
      className={`w-[27px] h-[27px] p-0 min-w-0 rounded-none box-border ${props.item.isClicked ? 'bg-warning' : 'bg-[#699]'}`}
      onClick={clickHandler}
      onContextMenu={contextHandler}
      isDisabled={isGameEnded}
      onMouseDown={clickStartHandler}
      onMouseUp={clickEndHandler}
      onPressStart={clickStartHandler}
      onPressEnd={clickEndHandler}
    >
      {cellText}
    </Button>
  );
};

export default Cell;
