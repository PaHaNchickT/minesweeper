'use client';

import { type ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { FIELD_CONFIG } from '@/constants/constants';
import { updateItem } from '@/redux/fieldItemsSlice';
import type { RootState } from '@/redux/store';

import Cell from '../Cell/Cell';


const Field = (): ReactElement => {
  const fieldItems = useSelector((state: RootState) => state.fieldItems.value);
  const dispatch = useDispatch();

  const queueCells: { x: number; y: number }[] = [];
  const viewedCells = new Set();

  const zeroCellsOpening = (x: number, y: number): void => {
    queueCells.shift();

    for (let countY = y - 1 < 0 ? 0 : y - 1; countY <= (y + 1 === FIELD_CONFIG.fieldSize ? y : y + 1); countY++) {
      for (let countX = x - 1 < 0 ? 0 : x - 1; countX <= (x + 1 === FIELD_CONFIG.fieldSize ? x : x + 1); countX++) {
        if (Array.from(viewedCells).includes(JSON.stringify({ x: countX, y: countY }))) continue;

        dispatch(
          updateItem({
            item: { isClicked: true },
            indexX: countX,
            indexY: countY,
          }),
        );

        viewedCells.add(JSON.stringify({ x: countX, y: countY }));

        if (
          !(countX === x && countY === y) &&
          fieldItems[countY][countX].innerText === 0 &&
          !queueCells.map((item) => JSON.stringify(item)).includes(JSON.stringify({ x: countX, y: countY }))
        ) {
          queueCells.push({ x: countX, y: countY });
        }
      }
    }

    if (queueCells.length) zeroCellsOpening(queueCells[0].x, queueCells[0].y);
  };

  return (
    <div className={`w-[432px] h-[432px] flex flex-wrap`}>
      {fieldItems.map((item, indexY) =>
        item.map((subItem, indexX) => (
          <Cell
            key={indexX + indexY}
            item={subItem}
            indexX={indexX}
            indexY={indexY}
            zeroCellsOpening={zeroCellsOpening}
          />
        )),
      )}
    </div>
  );
};

export default Field;
