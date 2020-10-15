import React, { memo, useCallback, useMemo, useState } from 'react';

import { MapContainer } from 'components/MapContainer/MapContainer';
import { SettingsPanel } from 'containers/SettingsPanel/SettingsPanel';
import { Search } from 'components/Search/Search';
import { useTranslation } from 'hooks/useTranslation';

import Icon from 'components/Utils/Icon/Icon';

import { ISortMethod, ISortMethodName } from 'types/arraySort/interface';
import {
  IFilterMethod,
  IFilterMethodName,
} from 'types/arrayFilter/arrayFilter';

import { AddMapFrom } from 'components/AddMapForm';
import { filterMethods, handleMapFilter, sortMethods } from './sortMaps';
import * as Styled from './Home.style';
import { UsefulLinks } from './UsefulLinks/UsefulLinks';
import { IHomeProps } from './interface';

export const Home = memo(
  ({
    changeMapName,
    changeIsNewMapModalOpen,
    changeSearchValue,
    deleteMap,
    openSettingsPanel,
    selectMap,
    toggleMapFavoriteAction,
    favoriteMapList,
    isNewMapModalOpened,
    mapFolder,
    mapList,
    searchValue,
    selectedMap,
  }: IHomeProps) => {
    const [selectedSortMethod, changeSelectedSortMethod] = useState<
      ISortMethod
    >(sortMethods.sortAsc);

    const [selectedFilterMethod, changeSelectedFilterMethod] = useState<
      IFilterMethod
    >(filterMethods.showAll);

    const { translate } = useTranslation();

    console.log('loop home');

    const handleFilterMethodChange = useCallback(
      (name: IFilterMethodName) => {
        if (selectedFilterMethod.name === name) {
          return;
        }

        changeSelectedFilterMethod(filterMethods[name]);
      },
      [selectedFilterMethod]
    );

    const handleSortButtonClick = useCallback(
      (sortMethodName: ISortMethodName) => {
        if (sortMethodName === selectedSortMethod.name) {
          return;
        }

        changeSelectedSortMethod(sortMethods[sortMethodName]);
      },
      [selectedSortMethod]
    );

    const filteredMapList = useMemo(() => {
      return handleMapFilter({
        mapList,
        favoriteMapList,
        searchValue,
        selectedFilterMethod,
        selectedSortMethod,
      });
    }, [
      mapList,
      searchValue,
      selectedSortMethod,
      selectedFilterMethod,
      favoriteMapList,
    ]);

    return (
      <Styled.Wrapper>
        <Styled.SettingsButton>
          <span
            tabIndex={0}
            onClick={openSettingsPanel}
            role="button"
            title="open menu"
          >
            <Icon name="cogs" size="40" />
          </span>
        </Styled.SettingsButton>

        <AddMapFrom
          handleClose={() => changeIsNewMapModalOpen({ status: false })}
          isOpened={isNewMapModalOpened}
        />
        <UsefulLinks />

        <SettingsPanel />

        <Search
          placeholder={translate('SEARCH_PLACEHOLDER')}
          searchValue={searchValue}
          handleChange={changeSearchValue}
          handleSortButtonClick={handleSortButtonClick}
          selectedSortMethod={selectedSortMethod.name}
          selectedFilterMethod={selectedFilterMethod.name}
          handleFilterButtonClick={handleFilterMethodChange}
        />

        <Styled.ActionsSidebar>
          {mapFolder !== '' && (
            <button
              type="button"
              onClick={() => changeIsNewMapModalOpen({ status: true })}
              disabled={mapFolder === ''}
            >
              {translate('NEW_MAP_FORM_TITLE')}
            </button>
          )}
        </Styled.ActionsSidebar>

        {filteredMapList && (
          <MapContainer
            deleteMapItem={deleteMap}
            flipKey={selectedSortMethod.name}
            toggleMapFavoriteAction={toggleMapFavoriteAction}
            filteredMapList={filteredMapList}
            mapList={mapList}
            mapFolder={mapFolder}
            selectedMap={selectedMap}
            favoriteMapList={favoriteMapList}
            handleMapClick={selectMap}
            changeMapName={changeMapName}
          />
        )}

        {mapList.length > 0 &&
          filteredMapList.length === 0 &&
          searchValue !== '' && (
            <Styled.InfoMessage>
              {translate('NO_SEARCH_RESULT')}
            </Styled.InfoMessage>
          )}

        {mapList.length === 0 && (
          <Styled.InfoMessage>{translate('NO_MAPS')}</Styled.InfoMessage>
        )}
      </Styled.Wrapper>
    );
  }
);
