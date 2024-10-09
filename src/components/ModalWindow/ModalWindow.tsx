'use client';

import { Modal, Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import type { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { TEXT_CONTENT } from '@/constants/constants';
import type { RootState } from '@/redux/store';

const ModalWindow = (props: { isOpen: boolean; onClose: () => void }): ReactElement => {
  const isWin = useSelector((state: RootState) => state.gameState.isWin);

  return (
    <Modal size="md" isOpen={props.isOpen} onClose={props.onClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-center">
              {isWin ? TEXT_CONTENT.modalTitleWin : TEXT_CONTENT.modalTitleLoose}
            </ModalHeader>
            <ModalBody className="flex flex-row justify-center">
              <p className='text-xs text-center'>{isWin ? TEXT_CONTENT.modalBodyWin : TEXT_CONTENT.modalBodyLoose}</p>
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <Button color="default" onPress={onClose}>
                {TEXT_CONTENT.modalCloseBtn}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalWindow;
