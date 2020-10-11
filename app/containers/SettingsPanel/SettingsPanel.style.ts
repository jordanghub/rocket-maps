import styled, { css } from 'styled-components';

interface IWrapperProps {
  animationState: string;
}

export const Wrapper = styled.div<IWrapperProps>`
  z-index: 999;

  min-width: 300px;
  height: 100vh;
  width: 50%;
  max-width: 600px;
  position: fixed !important;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.9);
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  & h3 {
    text-align: center;
  }

  transform: translateX(100%);

  transition: transform 300ms;

  ${(props) =>
    props.animationState === 'entered' &&
    css`
      transform: translateX(0);
    `}
`;

export const Actions = styled.div``;

export const Button = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 5px;
  color: black;
  margin-top: 1rem;

  font-size: 1rem;

  &:hover {
    cursor: pointer;
  }
`;
