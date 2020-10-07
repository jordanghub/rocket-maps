import styled, { css } from 'styled-components';

interface ILanguageItemStyleProps {
  isSelected: boolean;
}

export const LanguageWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

export const LanguageItem = styled.div<ILanguageItemStyleProps>`
  padding: 0.5rem;

  &:nth-child(n + 2) {
    margin-left: 1rem;
  }

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.isSelected &&
    css`
      background: rgba(208, 217, 210, 0.8);
    `}
`;
