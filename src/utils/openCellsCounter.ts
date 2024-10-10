import { FIELD_CONFIG } from '@/constants/constants';
import type { TCell } from '@/types/types';

export const openCellsCounter = (fieldItems: TCell[][]): number => {
  let openCells = 0;

  for (let countY = 0; countY < FIELD_CONFIG.fieldSize; countY++) {
    for (let countX = 0; countX < FIELD_CONFIG.fieldSize; countX++) {
      if (fieldItems[countY][countX].isClicked) openCells++;
    }
  }

  return openCells;
};

