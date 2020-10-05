import React, { useCallback, useState } from 'react';
import { IReplacementMapProps } from './interface';

import * as Styled from './ReplacementMap.style';

export const ReplacementMap = ({
  handleChange,
  mapName,
}: IReplacementMapProps) => {
  const [isMapInputEnabled, changeisMapInputEnabled] = useState(false);

  const handleCheckBoxChange = useCallback(() => {
    changeisMapInputEnabled((value) => !value);
  }, []);

  const handleMapNameChange = useCallback((evt: any) => {
    handleChange(evt.target.value);
  }, []);

  return (
    <Styled.Wrapper>
      <p>Nom du fichier de la map à remplacer</p>

      <Styled.MapInput
        type="text"
        disabled={!isMapInputEnabled}
        value={mapName}
        onChange={handleMapNameChange}
      />

      <Styled.CheckBoxInput
        type="checkbox"
        checked={isMapInputEnabled}
        onChange={handleCheckBoxChange}
      />
    </Styled.Wrapper>
  );
};
