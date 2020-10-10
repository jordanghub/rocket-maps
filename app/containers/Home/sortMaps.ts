import { IMapData } from 'types';
import { IFilterMethod, IFilterMethods } from 'types/arrayFilter/arrayFilter';
import { ISortMethod, ISortMethods } from 'types/arraySort/interface';
import {
  sortAlphabetically,
  sortAlphabeticallyReverse,
} from 'utils/arraySort/sortAlphabetically';
import { sortByDateAsc, sortByDateDesc } from 'utils/arraySort/sortByDate';

export interface IChangeMapsArgs {
  mapList: IMapData[];
  selectedFilterMethod: IFilterMethod;
  selectedSortMethod: ISortMethod;
  searchValue: string;
  favoriteMapList: string[];
}

export interface IChangeMapsHandler {
  mapList?: IMapData[];
  selectedFilterMethod?: IFilterMethod;
  selectedSortMethod?: ISortMethod;
  searchValue?: string;
  favoriteMapList?: string[];
}

export const sortMethods: ISortMethods = {
  sortAsc: {
    name: 'sortAsc',
    method: sortAlphabetically('name'),
  },
  sortDesc: {
    name: 'sortDesc',
    method: sortAlphabeticallyReverse('name'),
  },
  sortByDateAsc: {
    name: 'sortByDateAsc',
    method: sortByDateAsc,
  },
  sortByDateDesc: {
    name: 'sortByDateDesc',
    method: sortByDateDesc,
  },
};

export const filterMethods: IFilterMethods = {
  filterFavorite: {
    name: 'filterFavorite',
    method: (map: IMapData) => map.isFavorite,
  },
  filterNotFavorite: {
    name: 'filterNotFavorite',
    method: (map: IMapData) => !map.isFavorite,
  },
  showAll: {
    name: 'showAll',
    method: () => true,
  },
};

export const handleMapFilter = (props: IChangeMapsArgs) => {
  const {
    mapList,
    searchValue,
    favoriteMapList,
    selectedFilterMethod,
    selectedSortMethod,
  } = props;

  const newMapList = mapList.map((item) => ({
    ...item,
    isFavorite: favoriteMapList.includes(item.id),
  }));
  const filterResult: IMapData[] = newMapList.filter(
    selectedFilterMethod.method
  );
  const searchFilter =
    searchValue !== ''
      ? filterResult.filter((listItem) =>
          listItem.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : filterResult;

  searchFilter.sort(selectedSortMethod.method);
  return searchFilter;
};
