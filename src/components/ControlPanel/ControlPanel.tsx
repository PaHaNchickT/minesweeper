'use client';

import { Button } from '@nextui-org/react';
import type { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { TEXT_CONTENT } from '@/constants/constants';
import { clearField } from '@/redux/fieldItemsSlice';
import { generationOff } from '@/redux/isGeneratedSlice';

const ControlPanel = (): ReactElement => {
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        onPress={() => {
          dispatch(clearField());
          dispatch(generationOff());
        }}
      >
        {TEXT_CONTENT.NGBtn}
      </Button>
    </div>
  );
};

export default ControlPanel;
