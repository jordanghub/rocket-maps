import { useOnClickOutside } from 'hooks/useClickOutside';
import React, { memo, useRef } from 'react';
import { ISettingsPanelProps } from './interface';

import { remote } from 'electron';

import * as Styled from './SettingsPanel.style';
import { ReplacementMap } from './ReplacementMap';
import { useTranslation } from 'hooks/useTranslation';
import { Language } from './Language/Language';
import { Transition } from 'react-transition-group';

export const SettingsPanel = memo(
  ({
    handleClose,
    rocketPath,
    mapPath,
    handleMapPathChange,
    handleRocketPathChange,
    mapName,
    handleReplacementMapChange,
    resetReplacementMapName,
    localeList,
    handleLocaleChange,
    selectedLocale,
    isVisible,
  }: ISettingsPanelProps) => {
    const ref = useRef(null);
    useOnClickOutside(ref, handleClose);

    const { translate } = useTranslation();

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
      <Transition in={isVisible} timeout={300} mountOnEnter unmountOnExit>
        {(state) => (
          <Styled.Wrapper ref={ref} animationState={state}>
            <h3>{translate('SETTINGS_PANEL_TITLE')}</h3>

            <p>{translate('MAP_PATH_LABEL')}: </p>
            <small>
              {mapPath !== '' ? mapPath : translate('NO_PATH_DETECTED')}
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
              mapName={mapName}
              handleChange={handleReplacementMapChange}
              resetReplacementMapName={resetReplacementMapName}
            />

            <Language
              localeList={localeList}
              handleLocaleChange={handleLocaleChange}
              selectedLocale={selectedLocale}
            />
          </Styled.Wrapper>
        )}
      </Transition>
    );
  }
);
