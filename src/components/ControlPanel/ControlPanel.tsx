'use client';

import { Button } from '@nextui-org/react';
import type { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { clearField } from '@/redux/fieldItemsSlice';
import { generateOff } from '@/redux/isGeneratedSlice';

const ControlPanel = (): ReactElement => {
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        onPress={() => {
          dispatch(clearField());
          dispatch(generateOff());
        }}
      >
        New Game
      </Button>
    </div>
  );
};

export default ControlPanel;
