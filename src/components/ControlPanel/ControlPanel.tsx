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

const ControlPanel = (): ReactElement => {
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(0);
  const gameState = useSelector((state: RootState) => state.gameState);

  //timer
  useEffect(() => {
    if (!gameState.isGameStarted) return;

    const interval = setInterval(() => setSeconds((sec) => sec + 1), 1000);

    if (gameState.isGameEnded || seconds === 999) clearInterval(interval);
    return (): void => clearInterval(interval);
  }, [gameState.isGameStarted, gameState.isGameEnded, seconds]);

  return (
    <div className="w-[432px] flex justify-between items-center">
      <p>{(FIELD_CONFIG.bombsCount - gameState.flagsCount).toString().padStart(3, '0')}</p>
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
      <p>{seconds.toString().padStart(3, '0')}</p>
    </div>
  );
};

export default ControlPanel;
