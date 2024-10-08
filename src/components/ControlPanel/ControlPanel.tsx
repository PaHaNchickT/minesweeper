'use client';

import { Button } from '@nextui-org/react';
import type { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { FIELD_CONFIG, TEXT_CONTENT } from '@/constants/constants';
import { clearField } from '@/redux/fieldItemsSlice';
import { clearFlags, startGame } from '@/redux/gameStateSlice';
import { generationOff } from '@/redux/isGeneratedSlice';
import type { RootState } from '@/redux/store';

const ControlPanel = (): ReactElement => {
  const dispatch = useDispatch();
  const flagsCount = useSelector((state: RootState) => state.gameState.flagsCount);

  return (
    <div className="w-[432px] flex justify-between items-center">
      <p>{FIELD_CONFIG.bombsCount - flagsCount}</p>
      <Button
        onPress={() => {
          dispatch(clearField());
          dispatch(generationOff());
          dispatch(startGame());
          dispatch(clearFlags());
        }}
      >
        {TEXT_CONTENT.NGBtn}
      </Button>
      <p>00:00</p>
    </div>
  );
};

export default ControlPanel;
