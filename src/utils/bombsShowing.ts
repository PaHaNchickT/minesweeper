import { FIELD_CONFIG } from '@/constants/constants';
import type { TCell } from '@/types/types';

export const bombsShowing = (fieldItems: TCell[][]): { x: number; y: number }[] => {
  const output: { x: number; y: number }[] = [];

  for (let countY = 0; countY < FIELD_CONFIG.fieldSize; countY++) {
    for (let countX = 0; countX < FIELD_CONFIG.fieldSize; countX++) {
      if (fieldItems[countY][countX].isBomb && !fieldItems[countY][countX].isFlag)
        output.push({ x: countX, y: countY });
    }
  }

  return output;
};

