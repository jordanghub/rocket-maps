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

  ${StyledIcon.Wrapper}:first-child {
    &:hover {
      & svg path {
        fill: orange !important;
      }
    }
  }
`;

export const PlayButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
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
  background: #202020;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
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
  ${StyledIcon.Wrapper} {
    &:hover {
      cursor: pointer;
    }
  }

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
      background: rgba(255, 255, 255, 0.04);
    `}

  &:hover {
    background: rgba(255, 255, 255, 0.04);
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
  position: relative;

  &:hover {
    ${PlayButton} {
      display: flex;
    }
  }

  & img {
    width: 100%;
    height: 100%;
  }
`;
