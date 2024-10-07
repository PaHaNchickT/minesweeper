'use client';

import { Button } from '@nextui-org/react';
import type { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { TEXT_CONTENT } from '@/constants/constants';
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
        {TEXT_CONTENT.NGBtn}
      </Button>
    </div>
  );
};

export default ControlPanel;
