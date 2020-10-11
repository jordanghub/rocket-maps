import React from 'react';
import { Transition } from 'react-transition-group';

import * as Styled from './Modal.style';

export const Modal = ({ handleClose, isOpened, children }: any) => {
  return (
    <Transition in={isOpened} mountOnEnter unmountOnExit timeout={300}>
      {(animationState: string) => (
        <Styled.ModalWrapper animationState={animationState}>
          <Styled.ModalBackground onClick={handleClose} />
          <Styled.ModalContent>{children}</Styled.ModalContent>
        </Styled.ModalWrapper>
      )}
    </Transition>
  );
};
