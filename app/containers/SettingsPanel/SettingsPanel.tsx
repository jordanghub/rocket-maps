import { useOnClickOutside } from 'hooks/useClickOutside';
import React, { memo, useCallback, useRef } from 'react';

import { remote } from 'electron';

import * as Styled from './SettingsPanel.style';
import { ReplacementMap } from '../../components/SettingsPanel/ReplacementMap';
import { useTranslation } from 'hooks/useTranslation';
import { Language } from '../../components/SettingsPanel/Language/Language';
import { Transition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeMapFolderAction,
  changeReplacementMapNameAction,
  changeRocketPathAction,
  closeSettingsPanelAction,
} from 'store/features';
import { changeLocaleAction } from 'store/thunk';
import { DEFAULT_MAP_REPLACEMENT_NAME } from 'appConst/path';
import { IState } from 'store/features/interface';

export const SettingsPanel = memo(() => {
  const ref = useRef(null);

  const { translate } = useTranslation();

  const {
    rocketPath,
    mapFolder,
    isSettingsOpen,
    replacementMapName,
    localeList,
    locale,
  } = useSelector((state: IState) => state.app);

  const dispatch = useDispatch();

  /**
   * Actions
   */

  const handleClose = useCallback(() => dispatch(closeSettingsPanelAction()), [
    dispatch,
  ]);
  const handleRocketPathChange = useCallback(
    (payload) => dispatch(changeRocketPathAction(payload)),
    [dispatch]
  );

  const handleMapPathChange = useCallback(
    (payload) => dispatch(changeMapFolderAction(payload)),
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

  useOnClickOutside(ref, handleClose);

  const selectMapFolder = async () => {
    try {
      const result = await remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
      });

      if (result.canceled) {
        return;
      }

      handleMapPathChange({ path: result.filePaths[0] });
    } catch (err) {
      console.error(err);
    }
  };
  const selectRocketLeagueFolder = async () => {
    try {
      const result = await remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
      });

      if (result.canceled) {
        return;
      }

      handleRocketPathChange({ path: result.filePaths[0] });
    } catch (err) {}
  };

  return (
    <Transition in={isSettingsOpen} timeout={300} mountOnEnter unmountOnExit>
      {(state) => (
        <Styled.Wrapper ref={ref} animationState={state}>
          <h3>{translate('SETTINGS_PANEL_TITLE')}</h3>

          <p>{translate('MAP_PATH_LABEL')}: </p>
          <small>
            {mapFolder !== '' ? mapFolder : translate('NO_PATH_DETECTED')}
          </small>
          <p>{translate('GAME_PATH_LABEL')}</p>
          <small>
            {rocketPath !== '' ? rocketPath : translate('NO_PATH_DETECTED')}
          </small>

          <Styled.Actions>
            <Styled.Button role="button" onClick={selectMapFolder}>
              {translate('CHANGE_MAP_PATH_LABEL')}
            </Styled.Button>
            <Styled.Button role="button" onClick={selectRocketLeagueFolder}>
              {translate('CHANGE_GAME_PATH_LABEL')}
            </Styled.Button>
          </Styled.Actions>

          <ReplacementMap
            mapName={replacementMapName}
            handleChange={handleChangeMapName}
            resetReplacementMapName={resetReplacementMapName}
          />

          <Language
            localeList={localeList}
            handleLocaleChange={changeCurrentLocale}
            selectedLocale={locale}
          />
        </Styled.Wrapper>
      )}
    </Transition>
  );
});
