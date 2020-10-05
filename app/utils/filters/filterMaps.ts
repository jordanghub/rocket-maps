import { IMapData } from 'types';

export const searchByName = (
  list: IMapData[],
  searchValue: string
): IMapData[] => {
  return list.filter((listItem) =>
    listItem.name.toLowerCase().includes(searchValue.toLowerCase())
  );
};
