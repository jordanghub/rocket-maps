import React, { useCallback } from 'react';

import { IMapItemProps } from './interface'

import * as Styled from './MapItem.style';

export const MapItem = ({ name, thumbnail, mapFolder, selected, handleMapClick}: IMapItemProps) => {

  const handleClick = useCallback(() => {
    handleMapClick({ name });
  }, [name, handleMapClick])
  
  return (
    <Styled.Wrapper selected={selected} onClick={handleClick}>
      <h3>
        {name}
      </h3>
      <Styled.ThumbnailContainer>
        {
          thumbnail ? <img src={`file:///${mapFolder}/${name}/preview.png`} alt="osef" /> : <Styled.NoThumbnail>Aucun aperçu</Styled.NoThumbnail>
        }
      </Styled.ThumbnailContainer>
    </Styled.Wrapper>
  )
}

