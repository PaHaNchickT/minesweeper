import { FIELD_CONFIG } from '@/constants/constants';
import type { TCell } from '@/types/types';

import { closeCellsRadius } from './closeCellsRadius';

export const openCellsRadius = (
  currentX: number,
  currentY: number,
  fieldItems: TCell[][],
): { x: number; y: number }[] => {
  const output: { x: number; y: number }[] = [];

  let flagsCount = 0;
  for (
    let countY = currentY - 1 < 0 ? 0 : currentY - 1;
    countY <= (currentY + 1 === FIELD_CONFIG.fieldSize ? currentY : currentY + 1);
    countY++
  ) {
    for (
      let countX = currentX - 1 < 0 ? 0 : currentX - 1;
      countX <= (currentX + 1 === FIELD_CONFIG.fieldSize ? currentX : currentX + 1);
      countX++
    ) {
      if (fieldItems[countY][countX].isFlag) flagsCount++;
      if (!fieldItems[countY][countX].isFlag && !fieldItems[countY][countX].isClicked) {
        output.push({ x: countX, y: countY });
        if (fieldItems[countY][countX].innerText === 0) output.push(...closeCellsRadius(countX, countY, fieldItems));
      }
    }
  }

  return flagsCount === fieldItems[currentY][currentX].innerText ? output : [];
};

