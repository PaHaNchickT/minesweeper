// eslint-disable-next-line react-compiler/react-compiler
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, type ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { FIELD_CONFIG } from '@/constants/constants';
import { endGame, updateClickStatus } from '@/redux/gameStateSlice';
import type { RootState } from '@/redux/store';
import { openCellsCounter } from '@/utils/openCellsCounter';

import Cell from '../Cell/Cell';

const Field = (props: { onOpen: () => void }): ReactElement => {
  const dispatch = useDispatch();
  const fieldItems = useSelector((state: RootState) => state.fieldItems.value);
  const flagsCount = useSelector((state: RootState) => state.gameState.flagsCount);

  //Game Win
  useEffect(() => {
    if (
      flagsCount === FIELD_CONFIG.bombsCount &&
      FIELD_CONFIG.fieldSize ** 2 - FIELD_CONFIG.bombsCount === openCellsCounter(fieldItems)
    ) {
      props.onOpen();
      dispatch(endGame(true));
      dispatch(updateClickStatus('😎'));
    }
  }, [fieldItems, flagsCount]);

  return (
    <div
      className={`w-[440px] h-[440px] box-border flex flex-wrap border-4 border-l-[#808080] border-t-[#808080] border-r-white border-b-white`}
    >
      {fieldItems.map((item, indexY) =>
        item.map((subItem, indexX) => (
          <Cell key={indexX + indexY} item={subItem} currentPos={{ x: indexX, y: indexY }} onOpen={props.onOpen} />
        )),
      )}
    </div>
  );
};

export default Field;
