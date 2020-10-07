import { IMapData } from 'types';

export const filterNumberAsc = (a: number, b: number) => a - b;
export const filterNumberDesc = (a: number, b: number) => b - a;

export const sortByDateAsc = (a: IMapData, b: IMapData) =>
  filterNumberAsc(
    new Date(a.createdAt).getTime(),
    new Date(b.createdAt).getTime()
  );

export const sortByDateDesc = (a: IMapData, b: IMapData) =>
  filterNumberDesc(
    new Date(a.createdAt).getTime(),
    new Date(b.createdAt).getTime()
  );
