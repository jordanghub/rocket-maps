import styled, { css } from 'styled-components';

export const ChooseFileButton = styled.button`
  display: block;
`;

export const Loader = styled.div`
  transform: translateY(-50%);
`;

export const SubmitButton = styled.button`
  margin: 2rem auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

interface IModalWrapperStyleProps {
  animationState: string;
}

interface IFormErrorStyleProps {
  isError: boolean;
}

export const FormError = styled.small<IFormErrorStyleProps>`
  margin: 0.5rem 0;
  ${(props) =>
    props.isError &&
    css`
      color: red;
    `}
`;

export const Wrapper = styled.div`
  & h2 {
    text-transform: uppercase;
    text-align: center;
  }

  & label {
    display: flex;
    flex-direction: column;

    margin-bottom: 2rem;
    & span {
      margin-bottom: 1rem;
    }
  }

  & input {
    margin-top: 1rem;
    padding: 1rem;
    border: none;
    font-family: inherit;
  }

  & input::placeholder {
    font-family: inherit;
  }

  & button {
    font-family: inherit;
    outline: none;
    border: none;
    background: white;
    color: #202020;
    padding: 1rem;
    width: 100%;
    text-align: center;
    max-width: 300px;

    &:hover {
      cursor: pointer;
    }
  }
`;

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
