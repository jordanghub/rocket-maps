import Icon from 'components/Utils/Icon/Icon';
import React, {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { spring } from 'react-flip-toolkit';

import { IMapItemProps } from './interface';

import * as Styled from './MapItem.style';

export const MapItem = memo(
  ({
    id,
    name,
    thumbnail,
    mapFolder,
    selected,
    handleMapClick,
    noPreviewLabel,
    isFavorite = true,
    toggleMapFavoriteAction,
    changeMapName,
  }: IMapItemProps) => {
    const [isFavoriteIconHovered, changeIsFavoriteIconHovered] = useState(
      false
    );

    const [mapNameInputValue, changeMapNameInputValue] = useState(name);

    const [isEditMode, changeIsEditMode] = useState(false);

    const handleFavoriteIconHover = useCallback((value: boolean) => {
      return () => changeIsFavoriteIconHovered(value);
    }, []);

    const handleClick = useCallback(() => {
      handleMapClick({ name });
    }, [name, handleMapClick]);

    const toggleMapFavorite = useCallback(() => {
      toggleMapFavoriteAction({ isFavorite, mapId: id });
    }, [toggleMapFavoriteAction, isFavorite, id]);

    const toggleEditMode = useCallback(() => {
      changeIsEditMode((edit) => !edit);
    }, []);

    const handleMapNameInputChange = useCallback(
      (evt: ChangeEvent<HTMLInputElement>) => {
        changeMapNameInputValue(evt.target.value);
      },
      []
    );

    const handleMapNameInputBlur = () => {
      if (name !== mapNameInputValue) {
        changeMapName({ mapId: id, newMapName: mapNameInputValue });
        changeMapNameInputValue(name);
      }
      changeIsEditMode(false);
    };

    useEffect(() => {
      changeMapNameInputValue(name);
    }, [name]);
    const ref = useRef<HTMLDivElement>(null);

    return (
      <Styled.AnimationWrapper
        flipId={id}
        onAppear={(el: HTMLElement, index) => {
          spring({
            onUpdate: (val: number | Record<string, number>) => {
              el.style.opacity = (val as any) as string;
              el.style.transition = 'opacity 10ms';
            },
            delay: index * 2,
          });
        }}
        onExit={(el: HTMLElement, index, removeElement) => {
          spring({
            onUpdate: (val: number | Record<string, number>) => {
              el.style.opacity = `${(1 - (val as any)) as number}`;
            },
            onComplete: () => removeElement(),
            delay: index * 2,
          });
        }}
      >
        <Styled.Wrapper selected={selected} ref={ref}>
          <Styled.Actions>
            <Icon
              name="pencil"
              onClick={toggleEditMode}
              isSelected={isEditMode}
              activeColor="orange"
              activeBackground="transparent"
            />
            {isEditMode ? (
              <Icon name="bin" hoveredColor="red" />
            ) : (
              <Icon
                name="plus"
                onClick={handleClick}
                hoveredColor="lightgreen"
              />
            )}
          </Styled.Actions>
          {isEditMode ? (
            <Styled.MapItemInput>
              <input
                type="text"
                value={mapNameInputValue}
                onChange={handleMapNameInputChange}
                onBlur={handleMapNameInputBlur}
              />
            </Styled.MapItemInput>
          ) : (
            <h3>
              <span
                onMouseEnter={handleFavoriteIconHover(true)}
                onMouseLeave={handleFavoriteIconHover(false)}
              >
                <Icon
                  name={
                    isFavorite || isFavoriteIconHovered
                      ? 'star-full'
                      : 'star-empty'
                  }
                  onClick={toggleMapFavorite}
                />
              </span>

              <span>{name}</span>
            </h3>
          )}

          <Styled.ThumbnailContainer>
            {thumbnail ? (
              <img
                src={`file:///${mapFolder}/${name}/preview.png`}
                alt="preview placeholder"
              />
            ) : (
              <Styled.NoThumbnail>{noPreviewLabel}</Styled.NoThumbnail>
            )}
          </Styled.ThumbnailContainer>
        </Styled.Wrapper>
      </Styled.AnimationWrapper>
    );
  }
);
