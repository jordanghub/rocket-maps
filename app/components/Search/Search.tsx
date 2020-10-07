import React, { ChangeEvent, memo, useCallback } from 'react';
import { ISearchProps } from './interface';

import Icon from 'components/Utils/Icon/Icon';
import * as Styled from './Search.style';

import styled from 'styled-components';
export const Testeur = styled.div`
  width: 24px;
  height: 24px;
  background: red;
  padding: 16px;
  border: 1px solid black;
`;

export const Search = memo(
  ({
    handleChange,
    searchValue,
    placeholder,
    handleSortButtonClick,
    selectedSortMethod,
  }: ISearchProps) => {
    const handleInputChange = useCallback(
      (evt: ChangeEvent<HTMLInputElement>) => {
        handleChange({ searchValue: evt.target.value });
      },
      [handleChange]
    );

    return (
      <Styled.Wrapper>
        <Styled.SortButtons>
          <Styled.SortMethodButton
            isSelected={selectedSortMethod === 'sortAsc'}
            onClick={() => handleSortButtonClick('sortAsc')}
          >
            <Icon name="sort-alpha-asc" />
          </Styled.SortMethodButton>
          <Styled.SortMethodButton
            isSelected={selectedSortMethod === 'sortDesc'}
            onClick={() => handleSortButtonClick('sortDesc')}
          >
            <Icon name="sort-alpha-desc" />
          </Styled.SortMethodButton>

          <Styled.SortMethodButton
            isSelected={selectedSortMethod === 'sortByDateAsc'}
            onClick={() => handleSortButtonClick('sortByDateAsc')}
          >
            <Styled.DateIconJoined>
              <Icon name="calendar" />
              <Icon name="long-arrow-down" />
            </Styled.DateIconJoined>
          </Styled.SortMethodButton>

          <Styled.SortMethodButton
            isSelected={selectedSortMethod === 'sortByDateDesc'}
            onClick={() => handleSortButtonClick('sortByDateDesc')}
          >
            <Styled.DateIconJoined>
              <Icon name="calendar" />
              <Icon name="long-arrow-up" />
            </Styled.DateIconJoined>
          </Styled.SortMethodButton>
        </Styled.SortButtons>

        <input
          onChange={handleInputChange}
          value={searchValue}
          type="text"
          name="search-value"
          placeholder={placeholder}
        />
      </Styled.Wrapper>
    );
  }
);
