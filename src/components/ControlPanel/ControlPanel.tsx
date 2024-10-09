'use client';

import { Button } from '@nextui-org/react';
import { useEffect, useState, type ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { FIELD_CONFIG } from '@/constants/constants';
import { clearField } from '@/redux/fieldItemsSlice';
import { clearFlags, clearGame, updateClickStatus } from '@/redux/gameStateSlice';
import { generationOff } from '@/redux/isGeneratedSlice';
import type { RootState } from '@/redux/store';

import ControlPanelItems from '../ControlPanelItems/ControlPanelItems';

const ControlPanel = (): ReactElement => {
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(0);
  const gameState = useSelector((state: RootState) => state.gameState);

  // Timer
  useEffect(() => {
    if (!gameState.isGameStarted) return;

    const interval = setInterval(() => setSeconds((sec) => sec + 1), 1000);

    if (gameState.isGameEnded || seconds === 999) clearInterval(interval);
    return (): void => clearInterval(interval);
  }, [gameState.isGameStarted, gameState.isGameEnded, seconds]);

  return (
    <div className="w-full p-2 flex justify-between items-center box-border border-4 border-l-[#808080] border-t-[#808080] border-r-white border-b-white">
      <ControlPanelItems innerText={(FIELD_CONFIG.bombsCount - gameState.flagsCount).toString().padStart(3, '0')} />
      <Button
        onPress={() => {
          setSeconds(0);
          dispatch(clearField());
          dispatch(generationOff());
          dispatch(clearGame());
          dispatch(clearFlags());
          dispatch(updateClickStatus('🙂'));
        }}
      >
        {gameState.clickStatus}
      </Button>
      <ControlPanelItems innerText={seconds.toString().padStart(3, '0')} />
    </div>
  );
};

export default ControlPanel;
