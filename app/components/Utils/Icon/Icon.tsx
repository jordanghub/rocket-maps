import React from 'react';

import IcomoonReact from 'icomoon-react';
import iconSet from 'appConst/icons/selection.json';

import { IIconProps } from './interface';

import * as Styled from './Icon.style';

const Icon = ({
  color = 'white',
  size = '24px',
  name,
  className = '',
  isSelected = false,
  activeColor = 'black',
  onClick,
  activeBackground = 'white',
  hoveredColor,
}: IIconProps) => {
  return (
    <Styled.Wrapper
      isSelected={isSelected}
      onClick={onClick}
      activeBackground={activeBackground}
      hoveredColor={hoveredColor ?? color}
    >
      <IcomoonReact
        className={className}
        iconSet={iconSet}
        color={isSelected ? activeColor : color}
        size={size}
        icon={name}
      />
    </Styled.Wrapper>
  );
};

export default Icon;
