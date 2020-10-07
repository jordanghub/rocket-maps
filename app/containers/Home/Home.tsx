import React, { memo, useCallback, useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';

import {
  changeRocketPathAction,
  changeMapFolderAction,
  openSettingsPanelAction,
  closeSettingsPanelAction,
  clearFlashMessagesAction,
  changeSearchValueAction,
  changeReplacementMapNameAction,
} from '../../store/features';

import {
  changeLocaleAction,
  initMapWatchAction,
  selectMapAction,
} from 'store/thunk';

import { IState } from 'store/features/interface';

import * as Styled from './Home.style';
import { MapContainer } from 'containers/MapContainer/MapContainer';
import { SettingsPanel } from 'components/SettingsPanel/SettingsPanel';
import { Search } from 'components/Search/Search';
import { searchByName } from 'utils/filters/filterMaps';
import { IMapData } from 'types';
import { DEFAULT_MAP_REPLACEMENT_NAME } from 'appConst/path';
import { useTranslation } from 'hooks/useTranslation';

import debounce from 'lodash.debounce';
import { UsefulLinks } from './UsefulLinks/UsefulLinks';
import Icon from 'components/Utils/Icon/Icon';
import {
  sortAlphabetically,
  sortAlphabeticallyReverse,
} from 'utils/arraySort/sortAlphabetically';
import { sortByDateAsc, sortByDateDesc } from 'utils/arraySort/sortByDate';
import {
  ISortMethod,
  ISortMethods,
  ISortMethodName,
} from 'types/arraySort/interface';

const sortMethods: ISortMethods = {
  sortAsc: {
    name: 'sortAsc',
    method: sortAlphabetically('name'),
  },
  sortDesc: {
    name: 'sortDesc',
    method: sortAlphabeticallyReverse('name'),
  },
  sortByDateAsc: {
    name: 'sortByDateAsc',
    method: sortByDateAsc,
  },
  sortByDateDesc: {
    name: 'sortByDateDesc',
    method: sortByDateDesc,
  },
};

export const Home = memo(() => {
  const {
    rocketPath,
    mapList,
    mapFolder,
    isSettingsOpen,
    selectedMap,
    flashMessages,
    searchValue,
    replacementMapName,
    localeList,
    locale,
  } = useSelector((state: IState) => state.app);

  const [filteredMaps, changeFilteredMaps] = useState<IMapData[]>(mapList);

  const [selectedFilter, changeSelectedFilter] = useState<ISortMethod>(
    sortMethods.sortAsc
  );

  const dispatch = useDispatch();

  const { translate } = useTranslation();

  const debounceLog = useCallback(
    debounce(
      (maps, searchValue: string) =>
        changeFilteredMaps(searchByName(maps, searchValue)),
      300
    ),
    []
  );

  const changeSearchValue = useCallback(
    (payload: any) => {
      debounceLog(mapList, payload.searchValue);
      dispatch(changeSearchValueAction(payload));
    },
    [dispatch, debounceLog, mapList]
  );

  const openSettingsPanel = useCallback(
    () => dispatch(openSettingsPanelAction()),
    [dispatch]
  );
  const onMapClick = useCallback(
    (payload) => dispatch(selectMapAction(payload)),
    [dispatch]
  );
  const closeSettingsPanel = useCallback(
    () => dispatch(closeSettingsPanelAction()),
    [dispatch]
  );
  const changeRocketPath = useCallback(
    (payload) => dispatch(changeRocketPathAction(payload)),
    [dispatch]
  );

  const changeMapFolder = useCallback(
    (payload) => dispatch(changeMapFolderAction(payload)),
    [dispatch]
  );

  const clearFlashMessages = useCallback(
    () => dispatch(clearFlashMessagesAction()),
    [dispatch]
  );

  const changeCurrentLocale = useCallback(
    (payload) => dispatch(changeLocaleAction(payload)),
    [dispatch]
  );

  const handleChangeMapName = useCallback(
    (name: string) => dispatch(changeReplacementMapNameAction({ name })),
    [dispatch]
  );

  const resetReplacementMapName = useCallback(
    () => dispatch(handleChangeMapName(DEFAULT_MAP_REPLACEMENT_NAME)),
    [dispatch, handleChangeMapName]
  );

  const handleSortButtonClick = useCallback(
    (sortMethodName: ISortMethodName) => {
      if (sortMethodName === selectedFilter.name) {
        return;
      }
      const sortMethod = sortMethods[sortMethodName];

      if (!sortMethod) {
        return;
      }

      changeSelectedFilter(sortMethod);
    },
    [selectedFilter]
  );

  useEffect(() => {
    const newFilteredMaps = [...filteredMaps];
    newFilteredMaps.sort(selectedFilter.method);

    changeFilteredMaps(newFilteredMaps);
  }, [selectedFilter, mapList, searchValue]);

  const initMapWatch = useCallback(() => dispatch(initMapWatchAction()), [
    dispatch,
  ]);

  useEffect(() => {
    changeFilteredMaps(searchByName(mapList, searchValue));
  }, [mapList]);

  useEffect(() => {
    initMapWatch();
  }, [mapFolder, initMapWatch]);

  useEffect(() => {
    flashMessages.forEach((messageData: any) => {
      toast(messageData.message, messageData.config);

      if (flashMessages.length > 0) {
        clearFlashMessages();
      }
    });
  }, [flashMessages, clearFlashMessages]);

  return (
    <Styled.Wrapper>
      <ToastContainer position="bottom-center" />
      <Styled.SettingsButton>
        <span onClick={openSettingsPanel} role="button" title="open menu">
          <Icon name="cogs" size="40" />
        </span>
      </Styled.SettingsButton>

      <UsefulLinks />

      <SettingsPanel
        isVisible={isSettingsOpen}
        handleClose={closeSettingsPanel}
        rocketPath={rocketPath}
        mapPath={mapFolder}
        handleRocketPathChange={changeRocketPath}
        handleMapPathChange={changeMapFolder}
        mapName={replacementMapName}
        handleReplacementMapChange={handleChangeMapName}
        resetReplacementMapName={resetReplacementMapName}
        handleLocaleChange={changeCurrentLocale}
        localeList={localeList}
        selectedLocale={locale}
      />

      <Search
        placeholder={translate('SEARCH_PLACEHOLDER')}
        searchValue={searchValue}
        handleChange={changeSearchValue}
        handleSortButtonClick={handleSortButtonClick}
        selectedSortMethod={selectedFilter.name}
      />

      {filteredMaps.length > 0 && (
        <MapContainer
          mapList={filteredMaps}
          mapFolder={mapFolder}
          selectedMap={selectedMap}
          handleMapClick={onMapClick}
        />
      )}

      {filteredMaps.length > 0 &&
        filteredMaps.every((map) => !map.isVisible) &&
        searchValue !== '' && (
          <Styled.InfoMessage>
            {translate('NO_SEARCH_RESULT')}
          </Styled.InfoMessage>
        )}

      {filteredMaps.length === 0 && searchValue === '' && (
        <Styled.InfoMessage>{translate('NO_MAPS')}</Styled.InfoMessage>
      )}
    </Styled.Wrapper>
  );
});
