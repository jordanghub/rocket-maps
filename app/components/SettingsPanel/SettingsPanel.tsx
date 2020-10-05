import { useOnClickOutside } from 'hooks/useClickOutside';
import React, { useRef } from 'react';
import { ISettingsPanelProps } from './interface';

import { remote } from 'electron';

import * as Styled from './SettingsPanel.style';
import { ReplacementMap } from './ReplacementMap';

export const SettingsPanel = ({
  handleClose,
  rocketPath,
  mapPath,
  handleMapPathChange,
  handleRocketPathChange,
  mapName,
  handleReplacementMapChange,
}: ISettingsPanelProps) => {
  const ref = useRef(null);
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
    <Styled.Wrapper ref={ref}>
      <h3>Paramètres</h3>

      <p>Chemin du dossier des maps: </p>
      <small>{mapPath !== '' ? mapPath : 'Aucun chemin détécté'}</small>
      <p>Chemin vers le dossier du jeu</p>
      <small>{rocketPath !== '' ? rocketPath : 'Aucun chemin détécté'}</small>

      <Styled.Actions>
        <Styled.Button role="button" onClick={selectMapFolder}>
          Modifier le chemin vers les maps
        </Styled.Button>
        <Styled.Button role="button" onClick={selectRocketLeagueFolder}>
          Modifier le chemin vers le jeu
        </Styled.Button>
      </Styled.Actions>

      <ReplacementMap
        mapName={mapName}
        handleChange={handleReplacementMapChange}
      />
    </Styled.Wrapper>
  );
};
