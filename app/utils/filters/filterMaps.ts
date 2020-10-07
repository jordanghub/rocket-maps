import { IMapData } from 'types';

export const searchByName = (
  list: IMapData[],
  searchValue: string
): IMapData[] =>
  list.map((listItem) => ({
    ...listItem,
    isVisible: listItem.name.toLowerCase().includes(searchValue.toLowerCase()),
  }));
