import { MapItem } from 'components';
import { useTranslation } from 'hooks/useTranslation';
import React, { memo } from 'react';
import { TransitionGroup } from 'react-transition-group';

import { IMapContainerProps } from './interface';

import * as Styled from './MapContainer.style';

export const MapContainer = memo(
  ({ mapList, mapFolder, selectedMap, handleMapClick }: IMapContainerProps) => {
    const { translate } = useTranslation();

    return (
      <Styled.Wrapper>
        <h2>{translate('MAP_LIST_TITLE')}</h2>
        <Styled.MapContainer>
          {mapList.map((map, index) => (
            <MapItem
              isVisible={map.isVisible}
              name={map.name}
              key={index}
              thumbnail={map.isPreviewFileAvailable}
              mapFolder={mapFolder}
              selected={map.name === selectedMap}
              noPreviewLabel={translate('NO_MAP_PREVIEW_LABEL')}
              handleMapClick={handleMapClick}
            />
          ))}
        </Styled.MapContainer>
      </Styled.Wrapper>
    );
  }
);
