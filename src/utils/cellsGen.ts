import { FIELD_CONFIG } from '@/constants/constants';
import type { TCell } from '@/types/types';

import { bombsGen } from './bombsGen';

export const cellsGen = (initialCell: { x: number; y: number }): TCell[][] => {
  const bombsPos = bombsGen(initialCell);
  const fieldArray = [];

  for (let counterX = 0; counterX < FIELD_CONFIG.fieldSize; counterX++) {
    const subArray = [];
    for (let counterY = 0; counterY < FIELD_CONFIG.fieldSize; counterY++) {
      let isBomb = false;
      let innerText: number | string = 0;

      if (bombsPos.map((pos) => JSON.stringify(pos)).includes(JSON.stringify({ x: counterY, y: counterX }))) {
        isBomb = true;
        innerText = '💣';
      }

      subArray.push({ isBomb: isBomb, isClicked: false, isFlag: false, innerText: innerText });
    }
    fieldArray.push(subArray);
  }

  return fieldArray;
};
