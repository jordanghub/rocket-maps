import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';

import {
  openSettingsPanelAction,
  clearFlashMessagesAction,
  changeSearchValueAction,
  changeIsNewMapModalOpenAction,
} from 'store/features';

import {
  changeMapNameAction,
  deleteMapAction,
  initMapWatchAction,
  selectMapAction,
  toggleFavoriteAction,
} from 'store/thunk';

import { IState } from 'store/features/interface';

import { MapContainer } from 'containers/MapContainer/MapContainer';
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

export const Home = memo(() => {
  const {
    mapList,
    mapFolder,
    selectedMap,
    flashMessages,
    searchValue,
    favoriteMapList,
    isNewMapModalOpened,
  } = useSelector((state: IState) => state.app);

  const [selectedSortMethod, changeSelectedSortMethod] = useState<ISortMethod>(
    sortMethods.sortAsc
  );

  const [selectedFilterMethod, changeSelectedFilterMethod] = useState<
    IFilterMethod
  >(filterMethods.showAll);

  const dispatch = useDispatch();

  const { translate } = useTranslation();

  const changeMapName = useCallback(
    (payload) => {
      dispatch(changeMapNameAction(payload));
    },
    [dispatch]
  );

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

  const changeIsNewMapModalOpen = useCallback(
    (payload) => {
      dispatch(changeIsNewMapModalOpenAction(payload));
    },
    [dispatch]
  );

  const changeSearchValue = useCallback(
    (payload: any) => {
      dispatch(changeSearchValueAction(payload));
    },
    [dispatch]
  );

  const openSettingsPanel = useCallback(
    () => dispatch(openSettingsPanelAction()),
    [dispatch]
  );
  const onMapClick = useCallback(
    (payload) => dispatch(selectMapAction(payload)),
    [dispatch]
  );

  const clearFlashMessages = useCallback(
    () => dispatch(clearFlashMessagesAction()),
    [dispatch]
  );

  const toggleMapFavoriteAction = useCallback(
    (payload) => dispatch(toggleFavoriteAction(payload)),
    [dispatch]
  );

  const deleteMap = useCallback(
    (id: string) => dispatch(deleteMapAction({ mapId: id })),
    [dispatch]
  );

  const initMapWatch = useCallback(() => dispatch(initMapWatchAction()), [
    dispatch,
  ]);

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
      <ToastContainer position="bottom-center" />
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
        <button
          type="button"
          onClick={() => changeIsNewMapModalOpen({ status: true })}
        >
          {translate('NEW_MAP_FORM_TITLE')}
        </button>
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
          handleMapClick={onMapClick}
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
});
