import { MouseEvent } from 'react';

export interface IIconProps {
  color?: string;
  size?: string | number;
  name: IIconNames;
  className?: string;
  isSelected?: boolean;
  activeColor?: string;
  onClick?: (evt: MouseEvent<HTMLDivElement>) => void;
}

export type IIconNames =
  | 'sort-asc'
  | 'sort-desc'
  | 'calendar'
  | 'search'
  | 'cogs'
  | 'cog'
  | 'link'
  | 'star-empty'
  | 'star-full'
  | 'cross'
  | 'sort-alpha-asc'
  | 'sort-alpha-desc'
  | 'new-tab'
  | 'long-arrow-up'
  | 'long-arrow-down';

interface IIconStyleProps {
  isSelected: boolean;
}
