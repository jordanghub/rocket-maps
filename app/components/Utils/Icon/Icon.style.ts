import styled, { css } from 'styled-components';
import { IIconStyleProps } from './interface';

export const Wrapper = styled.span<IIconStyleProps>`
  ${({ isSelected }) =>
    isSelected &&
    css`
      background: white;
    `}
`;
