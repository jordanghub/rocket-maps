import styled, { css } from 'styled-components';
import { IIconStyleProps } from './interface';

export const Wrapper = styled.span<IIconStyleProps>`
  ${({ isSelected, activeBackground }) =>
    isSelected &&
    css`
      background: ${activeBackground};
    `}

  &:hover {
    & svg path {
      fill: ${(props) => props.hoveredColor}!important;
    }
  }
`;
