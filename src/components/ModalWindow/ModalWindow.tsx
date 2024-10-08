'use client';

import { Modal, Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import type { ReactElement } from 'react';

const ModalWindow = (props: { isOpen: boolean; onClose: () => void }): ReactElement => {
  return (
    <Modal size="md" isOpen={props.isOpen} onClose={props.onClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-center">Game Over!</ModalHeader>
            <ModalBody className="flex flex-row justify-center">
              <p>НУ ТЫ И ЛОШШААААРА КОНКРЕТНАЯ</p>
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <Button color="default" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalWindow;
