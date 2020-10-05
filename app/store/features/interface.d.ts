import { IMapData } from 'types';

export interface IAppState {
  rocketPath: string;
  mapList: IMapData[];
  mapFolder: string;
  isSettingsOpen: boolean;
  selectedMap: string;
  flashMessages: {
    config: any;
    message: string;
  }[];
  searchValue: string;
  replacementMapName: string;
}

export interface IState {
  app: IAppState;
}
