import {
  IChangeIsNewMapModalOpenPayload,
  IChangeMapNamePayload,
  IChangeSearchValuePayload,
  ISelectMapPayload,
  IToogleFavoritePayload,
} from 'store/features/interface';
import { IMapData } from 'types';

export interface IHomeProps {
  openSettingsPanel: () => void;
  changeIsNewMapModalOpen: (payload: IChangeIsNewMapModalOpenPayload) => void;
  changeSearchValue: (payload: IChangeSearchValuePayload) => void;
  deleteMap: (name: string) => void;
  selectMap: (payload: ISelectMapPayload) => void;
  changeMapName: (payload: IChangeMapNamePayload) => void;
  toggleMapFavoriteAction: (payload: IToogleFavoritePayload) => void;

  mapList: IMapData[];
  mapFolder: string;
  selectedMap: string;
  searchValue: string;
  favoriteMapList: string[];
  isNewMapModalOpened: boolean;
}
