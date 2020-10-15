import React, { useCallback, useEffect } from 'react';
import { Home } from 'components/Home';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeIsNewMapModalOpenAction,
  changeSearchValueAction,
  openSettingsPanelAction,
} from 'store/features';
import {
  changeMapNameAction,
  deleteMapAction,
  initMapWatchAction,
  selectMapAction,
  toggleFavoriteAction,
} from 'store/thunk';
import { IState } from 'store/features/interface';

export default function HomePage() {
  const {
    mapList,
    mapFolder,
    selectedMap,
    searchValue,
    favoriteMapList,
    isNewMapModalOpened,
  } = useSelector((state: IState) => state.app);

  const dispatch = useDispatch();

  const changeMapName = useCallback(
    (payload) => {
      dispatch(changeMapNameAction(payload));
    },
    [dispatch]
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

  const toggleMapFavorite = useCallback(
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
    if (mapFolder !== '') {
      initMapWatch();
    }
  }, [mapFolder, initMapWatch]);

  return (
    <Home
      changeMapName={changeMapName}
      changeIsNewMapModalOpen={changeIsNewMapModalOpen}
      changeSearchValue={changeSearchValue}
      deleteMap={deleteMap}
      openSettingsPanel={openSettingsPanel}
      selectMap={onMapClick}
      toggleMapFavoriteAction={toggleMapFavorite}
      favoriteMapList={favoriteMapList}
      isNewMapModalOpened={isNewMapModalOpened}
      mapFolder={mapFolder}
      mapList={mapList}
      searchValue={searchValue}
      selectedMap={selectedMap}
    />
  );
}
