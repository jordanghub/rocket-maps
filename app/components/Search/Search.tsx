import React, { useCallback } from 'react';
import { ISearchProps } from './interface';

import * as Styled from './Search.style';

export const Search = ({ handleChange, searchValue }: ISearchProps) => {
  const handleInputChange = useCallback(
    (evt: any) => {
      handleChange({ searchValue: evt.target.value });
    },
    [handleChange]
  );

  return (
    <Styled.Wrapper>
      <input
        onChange={handleInputChange}
        value={searchValue}
        type="text"
        name="search-value"
        placeholder="Rechercher"
      />
    </Styled.Wrapper>
  );
};
