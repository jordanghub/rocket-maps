import React from 'react';
import { Transition } from 'react-transition-group';
import { IModalProps } from './interface';

import * as Styled from './Modal.style';

export const Modal = ({
  handleClose,
  isOpened,
  children,
  background = 'white',
}: IModalProps) => {
  return (
    <Transition in={isOpened} mountOnEnter unmountOnExit timeout={300}>
      {(animationState: string) => (
        <Styled.ModalWrapper animationState={animationState}>
          <Styled.ModalBackground onClick={handleClose} />
          <Styled.ModalContent background={background}>
            {children}
          </Styled.ModalContent>
        </Styled.ModalWrapper>
      )}
    </Transition>
  );
};
