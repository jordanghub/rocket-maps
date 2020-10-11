import styled, { css } from 'styled-components';

interface IModalWrapperStyleProps {
  animationState: string;
}

export const ModalWrapper = styled.div<IModalWrapperStyleProps>`
  position: fixed !important;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  display: flex;
  transition: opacity 300ms;

  opacity: 0;

  ${(props) =>
    props.animationState === 'entered' &&
    css`
      opacity: 1;
    `}
`;

export const ModalBackground = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const ModalContent = styled.div`
  padding: 1rem;
  max-width: 800px;
  width: 100%;
  background: #202020;
  color: white;

  min-height: 300px;

  position: relative;
  margin: auto;
`;
