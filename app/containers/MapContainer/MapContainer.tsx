import { MapItem } from 'components';
import { useTranslation } from 'hooks/useTranslation';
import React, { memo, useMemo } from 'react';

import { IMapContainerProps } from './interface';

import * as Styled from './MapContainer.style';

export const MapContainer = memo(
  ({
    filteredMapList,
    mapFolder,
    selectedMap,
    handleMapClick,
    toggleMapFavoriteAction,
    favoriteMapList,
    changeMapName,
  }: IMapContainerProps) => {
    const { translate } = useTranslation();

    const flipKey = useMemo(
      () => filteredMapList.map((it) => it.id).join('-'),
      [filteredMapList]
    );

    return (
      <Styled.Wrapper>
        <h2>{translate('MAP_LIST_TITLE')}</h2>

        <Styled.MapContainer flipKey={flipKey} spring="veryGentle">
          {filteredMapList.map((item) => (
            <MapItem
              key={item.id}
              id={item.id}
              toggleMapFavoriteAction={toggleMapFavoriteAction}
              isVisible={item.isVisible}
              name={item.name}
              thumbnail={item.isPreviewFileAvailable}
              mapFolder={mapFolder}
              selected={item.name === selectedMap}
              noPreviewLabel={translate('NO_MAP_PREVIEW_LABEL')}
              handleMapClick={handleMapClick}
              isFavorite={favoriteMapList.includes(item.id)}
              changeMapName={changeMapName}
            />
          ))}
        </Styled.MapContainer>
      </Styled.Wrapper>
    );
  }
);
