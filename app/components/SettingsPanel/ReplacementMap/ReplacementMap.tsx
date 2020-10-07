import { useTranslation } from 'hooks/useTranslation';
import React, { memo, useCallback, useState } from 'react';
import { IReplacementMapProps } from './interface';

import * as Styled from './ReplacementMap.style';

export const ReplacementMap = memo(
  ({
    handleChange,
    resetReplacementMapName,
    mapName,
  }: IReplacementMapProps) => {
    const [isMapInputEnabled, changeisMapInputEnabled] = useState(false);

    const handleCheckBoxChange = useCallback(() => {
      changeisMapInputEnabled((value) => !value);
    }, []);

    const handleMapNameChange = useCallback((evt: any) => {
      handleChange(evt.target.value);
    }, []);

    const { translate } = useTranslation();

    return (
      <Styled.Wrapper>
        <p>{translate('REPLACEMENT_MAP_LABEL')}</p>

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

        <Styled.ResetButton role="button" onClick={resetReplacementMapName}>
          {translate('RESET_REPLACEMENT_MAP_LABEL')}
        </Styled.ResetButton>
      </Styled.Wrapper>
    );
  }
);
