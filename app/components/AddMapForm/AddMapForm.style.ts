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
  padding: 1rem;
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
    border: 1px solid transparent;

    &:hover {
      cursor: pointer;
      background: transparent;
      color: white;
      border: 1px solid white;
    }
  }
`;
