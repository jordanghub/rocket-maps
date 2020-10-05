import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

import { initMapWatchAction, selectMapAction } from 'store/thunk';

import { IState } from 'store/features/interface';

import * as Styled from './Home.style';
import { MapContainer } from 'containers/MapContainer/MapContainer';
import { SettingsPanel } from 'components/SettingsPanel/SettingsPanel';
import { Search } from 'components/Search/Search';
import { searchByName } from 'utils/filters/filterMaps';
import { IMapData } from 'types';

export default function Home(): JSX.Element {
  const {
    rocketPath,
    mapList,
    mapFolder,
    isSettingsOpen,
    selectedMap,
    flashMessages,
    searchValue,
    replacementMapName,
  } = useSelector((state: IState) => state.app);

  const dispatch = useDispatch();

  const changeSearchValue = useCallback(
    (payload) => dispatch(changeSearchValueAction(payload)),
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

  const handleChangeMapName = useCallback(
    (name: string) => dispatch(changeReplacementMapNameAction({ name })),
    [dispatch]
  );
  const initMapWatch = useCallback(() => dispatch(initMapWatchAction()), [
    dispatch,
  ]);

  const filteredMapsByName: IMapData[] = useMemo(
    () => searchByName(mapList, searchValue),
    [searchValue, mapList]
  );

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
        <span onClick={openSettingsPanel}>Ouvrir les paramètres</span>
      </Styled.SettingsButton>

      {isSettingsOpen && (
        <SettingsPanel
          handleClose={closeSettingsPanel}
          rocketPath={rocketPath}
          mapPath={mapFolder}
          handleRocketPathChange={changeRocketPath}
          handleMapPathChange={changeMapFolder}
          mapName={replacementMapName}
          handleReplacementMapChange={handleChangeMapName}
        />
      )}

      <Search searchValue={searchValue} handleChange={changeSearchValue} />

      {mapFolder !== '' && (
        <MapContainer
          mapList={filteredMapsByName}
          mapFolder={mapFolder}
          selectedMap={selectedMap}
          handleMapClick={onMapClick}
        />
      )}
    </Styled.Wrapper>
  );
}
