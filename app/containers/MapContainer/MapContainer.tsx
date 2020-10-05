import { MapItem } from 'components';
import React from 'react';

import { IMapContainerProps } from './interface';

import * as Styled from './MapContainer.style';

export const MapContainer = ({
  mapList,
  mapFolder,
  selectedMap,
  handleMapClick,
}: IMapContainerProps) => {
  return (
    <Styled.Wrapper>
      <h2>Liste des maps</h2>
      <Styled.MapContainer>
        {mapList.map((map, index) => (
          <MapItem
            name={map.name}
            key={index}
            thumbnail={map.isPreviewFileAvailable}
            mapFolder={mapFolder}
            selected={map.name === selectedMap}
            handleMapClick={handleMapClick}
          />
        ))}
      </Styled.MapContainer>
    </Styled.Wrapper>
  );
};
