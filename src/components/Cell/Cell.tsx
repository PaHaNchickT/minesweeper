'use client';

import { Button } from '@nextui-org/react';
import { useEffect, useState, type ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { CELLS_COLOR, FIELD_CONFIG } from '@/constants/constants';
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
  const [cellBg, setCellBg] = useState('bg-[#c0c0c0]');
  const isGenerated = useSelector((state: RootState) => state.isGenerated.value);
  const fieldItems = useSelector((state: RootState) => state.fieldItems.value);
  const gameState = useSelector((state: RootState) => state.gameState);

  const closedCellStyles = 'border-3 border-l-white border-t-white border-r-[#808080] border-b-[#808080]';
  const openedCellStyles = 'border-2 border-l-[#808080] border-t-[#808080]';

  let cellText = '';
  let cellColor = 'text-black';

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
    dispatch(updateField(fieldGen(fieldItems, { x: props.currentPos.x, y: props.currentPos.y })));
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

    setCellBg('bg-[#ff0000]');
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
    if (props.item.isClicked || (!props.item.isFlag && gameState.flagsCount >= FIELD_CONFIG.bombsCount)) return;

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
  if (!props.item.innerText && props.item.isClicked) cellText = '';
  if (typeof props.item.innerText === 'number' && props.item.innerText) cellColor = CELLS_COLOR[props.item.innerText];

  useEffect(() => {
    if (cellBg !== 'bg-[#c0c0c0]' && !gameState.isGameStarted && !gameState.isGameEnded) setCellBg('bg-[#c0c0c0]');
  }, [cellBg, gameState]);

  return (
    <Button
      className={`opacity-1 w-[27px] h-[27px] p-0 min-w-0 rounded-none box-border ${cellBg} ${props.item.isFlag ? 'flex flex-col justify-start' : ''} ${props.item.isClicked ? openedCellStyles : closedCellStyles} ${cellColor}`}
      onClick={clickHandler}
      onContextMenu={contextHandler}
      isDisabled={gameState.isGameEnded}
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
