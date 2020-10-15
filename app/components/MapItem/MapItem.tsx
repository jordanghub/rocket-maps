import Icon from 'components/Utils/Icon/Icon';
import { KeyObject } from 'crypto';
import { useOnClickOutside } from 'hooks/useClickOutside';
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
    deleteMapItem,
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

    const handleMapNameChange = useCallback(() => {
      if (name !== mapNameInputValue) {
        changeMapName({ mapId: id, newMapName: mapNameInputValue });
        changeMapNameInputValue(name);
      }
    }, [changeMapName, id, mapNameInputValue, name]);

    const handleMapNameInputBlur = () => {
      handleMapNameChange();
      changeIsEditMode(false);
    };

    useEffect(() => {
      changeMapNameInputValue(name);
    }, [name]);
    const ref = useRef<HTMLDivElement>(null);

    /**
     * Click en dehors de l'élément
     */

    const handleClickOut = useCallback(() => {
      if (isEditMode) {
        handleMapNameChange();
        changeIsEditMode(false);
      }
    }, [handleMapNameChange, isEditMode]);

    useOnClickOutside(ref, handleClickOut);

    /**
     * Double click sur le nom
     */

    const handleDoubleClick = useCallback(() => {
      if (!isEditMode) {
        changeIsEditMode(true);
      }
    }, [isEditMode]);

    /**
     * Appuie sur Escape ou Enter
     */

    const handleEditModeKeyboard = useCallback(
      (evt: KeyboardEvent) => {
        if (evt.code === 'Escape') {
          changeIsEditMode(false);
          changeMapNameInputValue(name);
        } else if (evt.code === 'Enter') {
          handleClickOut();
        }
      },
      [handleClickOut, name]
    );

    /**
     * Events clavier
     */

    useEffect(() => {
      if (isEditMode) {
        document.addEventListener('keydown', handleEditModeKeyboard);
        return () =>
          document.removeEventListener('keydown', handleEditModeKeyboard);
      }

      return undefined;
    }, [isEditMode, handleEditModeKeyboard]);

    return (
      <Styled.AnimationWrapper
        flipId={id}
        onAppear={(el: HTMLElement, index) => {
          spring({
            onUpdate: (val: number | Record<string, number>) => {
              el.style.opacity = (val as any) as string;
              el.style.transition = 'opacity 150ms';
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
        <Styled.Wrapper selected={selected} ref={ref} isEditMode={isEditMode}>
          <Styled.Actions>
            <Icon
              name="pencil"
              onClick={toggleEditMode}
              isSelected={isEditMode}
              activeColor="orange"
              activeBackground="transparent"
            />
            {isEditMode && (
              <Icon
                name="bin"
                hoveredColor="red"
                onClick={() => deleteMapItem(id)}
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

              <span onDoubleClick={handleDoubleClick}>{name}</span>
            </h3>
          )}

          <Styled.ThumbnailContainer>
            <Styled.PlayButton>
              <Icon
                name="play2"
                // onClick={handleClick}
                color="lightgreen"
                size={100}
                onClick={handleClick}
              />
            </Styled.PlayButton>
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
