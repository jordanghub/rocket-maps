import { IMapData } from 'types/maps/interface';

export type ISortMethodName =
  | 'sortAsc'
  | 'sortDesc'
  | 'sortByDateAsc'
  | 'sortByDateDesc';

export interface ISortMethods {
  sortAsc: ISortMethod;
  sortDesc: ISortMethod;
  sortByDateAsc: ISortMethod;
  sortByDateDesc: ISortMethod;
}

export interface ISortMethod {
  name: ISortMethodName;
  method: (a: IMapData, b: IMapData) => any;
}
