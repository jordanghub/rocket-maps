import { IMapData } from 'types';
import { ISortMethodName } from 'types/arraySort/interface';

export interface IMapContainerProps {
  mapList: IMapData[];
  filteredMapList: any[];
  mapFolder: string;
  selectedMap: string;
  handleMapClick: (payload: any) => void;
  favoriteMapList: string[];
  toggleMapFavoriteAction: (payload: any) => void;
  flipKey: ISortMethodName;
  changeMapName: (payload: any) => void;
  deleteMapItem: (id: string) => void;
}
