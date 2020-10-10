import { IMapData } from 'types/maps/interface';

export type IFilterMethodName =
  | 'filterFavorite'
  | 'filterNotFavorite'
  | 'showAll';

export interface IFilterMethods {
  filterFavorite: IFilterMethod;
  filterNotFavorite: IFilterMethod;
  showAll: IFilterMethod;
}
export interface IFilterMethod {
  name: IFilterMethodName;
  method: (a: IMapData) => boolean;
}
