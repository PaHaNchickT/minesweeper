'use client';

import { Button } from '@nextui-org/react';
import { useEffect, useState, type ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { FIELD_CONFIG, TEXT_CONTENT } from '@/constants/constants';
import { clearField } from '@/redux/fieldItemsSlice';
import { clearFlags, clearGame } from '@/redux/gameStateSlice';
import { generationOff } from '@/redux/isGeneratedSlice';
import type { RootState } from '@/redux/store';

const ControlPanel = (): ReactElement => {
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(0);
  const flagsCount = useSelector((state: RootState) => state.gameState.flagsCount);

  const isGameEnded = useSelector((state: RootState) => state.gameState.isGameEnded);
  const isGameStarted = useSelector((state: RootState) => state.gameState.isGameStarted);

  //timer
  useEffect(() => {
    if (!isGameStarted) return;

    const interval = setInterval(() => setSeconds((sec) => sec + 1), 1000);

    if (isGameEnded || seconds === 999) clearInterval(interval);
    return (): void => clearInterval(interval);
  }, [isGameStarted, isGameEnded, seconds]);

  return (
    <div className="w-[432px] flex justify-between items-center">
      <p>{(FIELD_CONFIG.bombsCount - flagsCount).toString().padStart(3, '0')}</p>
      <Button
        onPress={() => {
          setSeconds(0);
          dispatch(clearField());
          dispatch(generationOff());
          dispatch(clearGame());
          dispatch(clearFlags());
        }}
      >
        {TEXT_CONTENT.NGBtn}
      </Button>
      <p>{seconds.toString().padStart(3, '0')}</p>
    </div>
  );
};

export default ControlPanel;
