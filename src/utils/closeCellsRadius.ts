import { FIELD_CONFIG } from '@/constants/constants';
import type { TCell } from '@/types/types';

export const closeCellsRadius = (
  currentX: number,
  currentY: number,
  fieldItems: TCell[][],
): { x: number; y: number }[] => {
  const queueCells: { x: number; y: number }[] = [];
  const viewedCells = new Set();

  const output: { x: number; y: number }[] = [];

  const zeroCellsOpening = (x: number, y: number): void => {
    queueCells.shift();

    if (fieldItems[y][x].innerText === 0) {
      for (let countY = y - 1 < 0 ? 0 : y - 1; countY <= (y + 1 === FIELD_CONFIG.fieldSize ? y : y + 1); countY++) {
        for (let countX = x - 1 < 0 ? 0 : x - 1; countX <= (x + 1 === FIELD_CONFIG.fieldSize ? x : x + 1); countX++) {
          if (Array.from(viewedCells).includes(JSON.stringify({ x: countX, y: countY }))) continue;

          output.push({ x: countX, y: countY });
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
    }

    if (queueCells.length) zeroCellsOpening(queueCells[0].x, queueCells[0].y);
  };
  zeroCellsOpening(currentX, currentY);

  return output;
};

