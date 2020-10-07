import React, { memo, useCallback, useEffect, useState } from 'react';
import { CSSTransition, Transition } from 'react-transition-group';

import { IMapItemProps } from './interface';

import * as Styled from './MapItem.style';

export const MapItem = memo(
  ({
    name,
    thumbnail,
    mapFolder,
    selected,
    handleMapClick,
    noPreviewLabel,
    isVisible,
  }: IMapItemProps) => {
    const handleClick = useCallback(() => {
      handleMapClick({ name });
    }, [name, handleMapClick]);

    return (
      <Transition in={isVisible} timeout={300} unmountOnExit mountOnEnter>
        {(state) => (
          <Styled.Wrapper
            selected={selected}
            onClick={handleClick}
            animationState={state}
          >
            <h3>{name}</h3>
            <Styled.ThumbnailContainer>
              {thumbnail ? (
                <img
                  src={`file:///${mapFolder}/${name}/preview.png`}
                  alt="osef"
                />
              ) : (
                <Styled.NoThumbnail>{noPreviewLabel}</Styled.NoThumbnail>
              )}
            </Styled.ThumbnailContainer>
          </Styled.Wrapper>
        )}
      </Transition>
    );
  }
);
