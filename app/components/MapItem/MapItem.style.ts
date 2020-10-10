import styled, { css, keyframes } from 'styled-components';

import * as StyledIcon from 'components/Utils/Icon/Icon.style';
import { Flipped } from 'react-flip-toolkit';

interface IWrapperProps {
  selected: boolean;
}

const inputColorChange = keyframes`
  0% {
    border-color: white;
  }
  50% {
    border-color: darkorange;
  }
  100% {
    border-color: white;
  }
`;

export const AnimationWrapper = styled(Flipped)`
  max-width: 333px;
  display: flex;
  justify-content: center;
  align-items: center;

  will-change: transform;
`;

export const Actions = styled.div`
  display: flex;
  padding: 0 0 1rem 0;
  justify-content: space-between;
  width: 100%;

  opacity: 0;
  transition: opacity 200ms;

  ${StyledIcon.Wrapper} {
    margin-left: 0.5rem;
  }

  /* ${StyledIcon.Wrapper}:last-child {
    &:hover {
      & svg path {
        fill: lightgreen !important;
      }
    }
  } */
  ${StyledIcon.Wrapper}:first-child {
    &:hover {
      & svg path {
        fill: orange !important;
      }
    }
  }
`;

export const MapItemInput = styled.div`
  max-width: 100%;
  margin-top: -1rem;
  & input {
    border: none;
    background: transparent;
    font-family: inherit;
    color: white;
    font-weight: bold;
    outline: none;
    text-align: center;
    font-size: 1.17em;
    border-bottom: 3px solid transparent;
    /* border-right: 3px solid transparent; */
    padding: 0.5rem;
    max-width: 100%;

    animation: ${inputColorChange} 2s linear infinite;
  }
`;
export const NoThumbnail = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;

export const Wrapper = styled.div<IWrapperProps>`
  padding: 1rem;
  max-width: 333px;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  will-change: transform;

  & h3 {
    margin-top: 0;
    display: flex;
    justify-content: center;
    ${StyledIcon.Wrapper} {
      display: block;
      margin-right: 0.5rem;
      margin-top: -3px;

      & svg path {
        fill: orange !important;
      }
    }
  }

  ${(props) =>
    props.selected &&
    css`
      background: rgba(255, 255, 255, 0.2);
    `}

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.2);
  }

  @media screen and (min-width: 1000px) {
    width: 100%;
  }

  &:hover {
    ${Actions} {
      opacity: 1;
    }
  }
`;

export const ThumbnailContainer = styled.div`
  width: 300px;
  height: 300px;

  & img {
    width: 100%;
    height: 100%;
  }
`;
