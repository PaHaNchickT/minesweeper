import { FIELD_CONFIG } from '@/constants/constants';
import type { TCell } from '@/types/types';

import { cellsGen } from './cellsGen';

export const fieldGen = (initialCell: { x: number; y: number }): TCell[][] => {
  const rawCells = cellsGen(initialCell);

  const bombsCounter = (startPos: { x: number; y: number }, endPos: { x: number; y: number }): number => {
    let summBombs = 0;

    for (let counterY = startPos.y; counterY <= endPos.y; counterY++) {
      for (let counterX = startPos.x; counterX <= endPos.x; counterX++) {
        if (rawCells[counterY][counterX].isBomb) summBombs++;
      }
    }

    return summBombs;
  };

  rawCells.forEach((row, indexY) => {
    row.forEach((cell, indexX) => {
      if (!cell.isBomb) {
        cell.innerText = bombsCounter(
          { x: indexX - 1 < 0 ? 0 : indexX - 1, y: indexY - 1 < 0 ? 0 : indexY - 1 },
          {
            x: indexX + 1 === FIELD_CONFIG.fieldSize ? indexX : indexX + 1,
            y: indexY + 1 === FIELD_CONFIG.fieldSize ? indexY : indexY + 1,
          },
        );
      }
    });
  });

  return rawCells;
};
