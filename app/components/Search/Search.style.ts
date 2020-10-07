import styled, { css } from 'styled-components';

import * as StyledIcon from 'components/Utils/Icon/Icon.style';
import { IIconStyleProps } from 'components/Utils/Icon/interface';

interface IMethodSelectedStyleProps {
  isSelected: boolean;
}

export const Wrapper = styled.div`
  position: relative;
  margin: 1rem auto;
  max-width: 1000px;
  width: 100%;

  & input {
    width: 100%;
    padding: 1rem;
    outline: none;
    background: #252525;
    box-shadow: none;
    border: none;
  }

  & input::placeholder,
  & input {
    color: white;
    font-family: 'Montserrat', sans-serif;
  }
`;

export const SortButtons = styled.div`
  display: flex;
  ${StyledIcon.Wrapper} {
    display: block;

    & svg {
      width: 24px;
      height: 24px;
    }
    padding: 1rem;
  }
`;

export const SortByNameButtons = styled.div``;

export const SortByDateButtons = styled.div``;

export const DateIconJoined = styled.div`
  padding: 0 0.5rem;
  position: relative;
  ${StyledIcon.Wrapper} {
    &:first-child {
      position: relative;
      left: 0.5rem;
    }
    &:last-child {
      position: absolute;
      background: transparent;
      left: -1rem;
      top: 0;
    }
  }
`;

export const SortMethodButton = styled.div<IIconStyleProps>`
  background: #202020;

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.isSelected &&
    css`
      background: white;
      ${StyledIcon.Wrapper} {
        & svg path {
          fill: #202020 !important;
        }
      }
    `}
`;
