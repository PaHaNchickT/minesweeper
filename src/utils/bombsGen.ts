import { FIELD_CONFIG } from '@/constants/constants';

import { randomizer } from './randomizer';

export const bombsGen = (initialCell: { x: number; y: number }): { x: number; y: number }[] => {
  const bombsPos: { x: number; y: number }[] = [];
  const initialArray = [
    { x: initialCell.x - 1, y: initialCell.y - 1 },
    { x: initialCell.x, y: initialCell.y - 1 },
    { x: initialCell.x + 1, y: initialCell.y - 1 },
    { x: initialCell.x - 1, y: initialCell.y },
    { x: initialCell.x, y: initialCell.y },
    { x: initialCell.x + 1, y: initialCell.y },
    { x: initialCell.x - 1, y: initialCell.y + 1 },
    { x: initialCell.x, y: initialCell.y + 1 },
    { x: initialCell.x + 1, y: initialCell.y + 1 },
  ];

  const posSelection = (): void => {
    const currentPosition = { x: randomizer(FIELD_CONFIG.fieldSize), y: randomizer(FIELD_CONFIG.fieldSize) };

    if (
      initialArray.map((pos) => JSON.stringify(pos)).includes(JSON.stringify(currentPosition)) ||
      bombsPos.map((pos) => JSON.stringify(pos)).includes(JSON.stringify(currentPosition))
    ) {
      posSelection();
    } else {
      bombsPos.push(currentPosition);
    }
  };

  for (let counter = 0; counter < FIELD_CONFIG.bombsCount; counter++) {
    posSelection();
  }

  return bombsPos;
};

