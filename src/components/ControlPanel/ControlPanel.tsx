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
  const [smileStyles, setSmileStyles] = useState(
    'border-3 border-l-white border-t-white border-r-[#808080] border-b-[#808080] sm:border-4',
  );
  const gameState = useSelector((state: RootState) => state.gameState);

  // Timer
  useEffect(() => {
    if (!gameState.isGameStarted) return;

    const interval = setInterval(() => setSeconds((sec) => sec + 1), 1000);

    if (gameState.isGameEnded || seconds === 999) clearInterval(interval);
    return (): void => clearInterval(interval);
  }, [gameState.isGameStarted, gameState.isGameEnded, seconds]);

  return (
    <div className="w-full p-2 flex justify-between items-center box-border border-3 border-l-[#808080] border-t-[#808080] border-r-white border-b-white sm:border-4">
      <ControlPanelItems innerText={(FIELD_CONFIG.bombsCount - gameState.flagsCount).toString().padStart(3, '0')} />
      <div className="relative">
        <Button
          className={`bg-[#c0c0c0] relative z-[1] text-2xl p-0 flex leading-[1.2] flex-col justify-start min-w-0 w-[43px] h-[43px] rounded-none ${smileStyles}`}
          onPress={() => {
            setSeconds(0);
            dispatch(clearField());
            dispatch(generationOff());
            dispatch(clearGame());
            dispatch(clearFlags());
            dispatch(updateClickStatus('🙂'));
          }}
          onPressStart={() =>
            setSmileStyles('border-4 border-l-[#808080] border-t-[#808080] border-r-[#c0c0c0] border-b-[#c0c0c0]')
          }
          onPressEnd={() =>
            setSmileStyles('border-4 border-l-white border-t-white border-r-[#808080] border-b-[#808080]')
          }
        >
          {gameState.clickStatus}
        </Button>
        <div className="w-[47px] h-[47px] bg-[#808080] absolute left-[-2px] top-[-2px] z-0"></div>
      </div>
      <ControlPanelItems innerText={seconds.toString().padStart(3, '0')} />
    </div>
  );
};

export default ControlPanel;
