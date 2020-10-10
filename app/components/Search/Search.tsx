import React, { ChangeEvent, memo, useCallback, useState } from 'react';

import Icon from 'components/Utils/Icon/Icon';

import debounce from 'lodash.debounce';
import * as Styled from './Search.style';
import { ISearchProps } from './interface';

export const Search = memo(
  ({
    handleChange,
    searchValue,
    placeholder,
    handleSortButtonClick,
    selectedSortMethod,
    handleFilterButtonClick,
    selectedFilterMethod,
  }: ISearchProps) => {
    const [searchInput, changeSearchInput] = useState(searchValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceChangeValue = useCallback(
      debounce(
        (searchString: string) => handleChange({ searchValue: searchString }),
        300
      ),
      []
    );

    const handleInputChange = useCallback(
      (evt: ChangeEvent<HTMLInputElement>) => {
        debounceChangeValue(evt.target.value);
        changeSearchInput(evt.target.value);
      },
      [debounceChangeValue]
    );

    return (
      <Styled.Wrapper>
        <Styled.Filters>
          <Styled.SortButtons>
            <Styled.SortMethodButton
              isSelected={selectedFilterMethod === 'showAll'}
              onClick={() => handleFilterButtonClick('showAll')}
            >
              <Icon name="all_inclusive" />
            </Styled.SortMethodButton>
            <Styled.SortMethodButton
              isSelected={selectedFilterMethod === 'filterFavorite'}
              onClick={() => handleFilterButtonClick('filterFavorite')}
            >
              <Icon name="star-full" />
            </Styled.SortMethodButton>
            <Styled.SortMethodButton
              isSelected={selectedFilterMethod === 'filterNotFavorite'}
              onClick={() => handleFilterButtonClick('filterNotFavorite')}
            >
              <Icon name="star-empty" />
            </Styled.SortMethodButton>
          </Styled.SortButtons>
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
        </Styled.Filters>

        <input
          onChange={handleInputChange}
          value={searchInput}
          type="text"
          name="search-value"
          placeholder={placeholder}
        />
      </Styled.Wrapper>
    );
  }
);
