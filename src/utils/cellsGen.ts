import { FIELD_CONFIG } from '@/constants/constants';
import type { TCell } from '@/types/types';

export const cellsGen = (): TCell[][] => {
  const fieldArray = [];
  for (let counterX = 0; counterX < FIELD_CONFIG.fieldSize; counterX++) {
    const subArray = [];
    for (let counterY = 0; counterY < FIELD_CONFIG.fieldSize; counterY++) {
      subArray.push({ isBomb: false, isClicked: false, isFlag: false, innerText: 0 });
    }
    fieldArray.push(subArray);
  }

  return fieldArray;
};

