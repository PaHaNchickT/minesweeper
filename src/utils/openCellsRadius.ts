import { FIELD_CONFIG } from '@/constants/constants';
import type { TCell } from '@/types/types';

import { closeCellsRadius } from './closeCellsRadius';

export const openCellsRadius = (
  currentX: number,
  currentY: number,
  fieldItems: TCell[][],
): { cellsToOpen: { x: number; y: number }[]; wrongFlags: { x: number; y: number }[] } => {
  const cellsToOpen: { x: number; y: number }[] = [];
  const wrongFlags: { x: number; y: number }[] = [];

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
        cellsToOpen.push({ x: countX, y: countY });
        if (fieldItems[countY][countX].innerText === 0)
          cellsToOpen.push(...closeCellsRadius(countX, countY, fieldItems));
      }

      if (fieldItems[countY][countX].isFlag && !fieldItems[countY][countX].isBomb)
        wrongFlags.push({ x: countX, y: countY });
    }
  }

  return {
    cellsToOpen: flagsCount === fieldItems[currentY][currentX].innerText ? cellsToOpen : [],
    wrongFlags: flagsCount === fieldItems[currentY][currentX].innerText ? wrongFlags : [],
  };
  // return flagsCount === fieldItems[currentY][currentX].innerText ? cellsToOpen : [];
};

