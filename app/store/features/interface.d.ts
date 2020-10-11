import { IMessagesLabel } from 'appConst/messages';
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
  locale: string;
  messages: IMessagesLabel;
  localeList: ILocaleListItem[];
  favoriteMapList: string[];
  isNewMapModalOpened: boolean;
}

export interface IState {
  app: IAppState;
}

export interface IActionWithPayload<P> {
  type: string;
  payload: P;
}

export interface ILocaleListItem {
  flagCode: string;
  localeCode: string;
}

export type IChangeRocketPathAction = IActionWithPayload<
  IChangeRocketPathPayload
>;

export interface IChangeRocketPathPayload {
  init?: boolean;
  path: string;
}

export type IChangeMapFolderAction = IActionWithPayload<
  IChangeMapFolderPayload
>;

export interface IChangeMapFolderPayload {
  init?: boolean;
  path: string;
}

export type IChangeMapListAction = IActionWithPayload<IChangeMapListPayload>;

export interface IChangeMapListPayload {
  list: any;
}

export type IChangeSelectedMapAction = IActionWithPayload<
  IChangeSelectedMapPayload
>;

export interface IChangeSelectedMapPayload {
  init?: boolean;
  name: string;
}

export type IAddFlashMessageAction = IActionWithPayload<
  IAddFlashMessagePayload
>;

export interface IAddFlashMessagePayload {
  message: string;
  config: {
    type: string;
  };
}

export type IChangeSearchValueAction = IActionWithPayload<
  IChangeSearchValuePayload
>;

export interface IChangeSearchValuePayload {
  searchValue: string;
}

export type IChangeReplacementMapNameAction = IActionWithPayload<
  IChangeReplacementMapNamePayload
>;

export interface IChangeReplacementMapNamePayload {
  init?: boolean;
  name: string;
}

export type IChangeCurrentLocaleAction = IActionWithPayload<
  IChangeCurrentLocalePayload
>;

export interface IChangeCurrentLocalePayload {
  init?: boolean;
  locale: string;
}

export type IChangeMessagesAction = IActionWithPayload<IChangeMessagesPayload>;

export interface IChangeMessagesPayload {
  messages: any;
}

export type IAddToFavoriteAction = IActionWithPayload<IAddToFavoritePayload>;

export interface IAddToFavoritePayload {
  mapId: string;
}

export type IRemoveFromFavoriteAction = IActionWithPayload<
  IRemoveFromFavoritePayload
>;

export interface IRemoveFromFavoritePayload {
  mapId: string;
}

export type IChangeFavoriteMapListAction = IActionWithPayload<
  IChangeFavoriteMapListPayload
>;

export interface IChangeFavoriteMapListPayload {
  favoriteMapList: string[];
}

export type IChangeIsNewMapModalOpenAction = IActionWithPayload<
  IChangeIsNewMapModalOpenPayload
>;

export interface IChangeIsNewMapModalOpenPayload {
  status: boolean;
}

export interface IToogleFavoritePayload {
  isFavorite: boolean;
  mapId: string;
}

export interface IChangeMapNamePayload {
  newMapName: string;
  mapId: string;
}
export interface ISelectMapPayload {
  name: string;
}

export interface IChangeLocalePayload {
  localeCode: string;
}

export interface IAddNewMapPayload {
  mapName: string;
  archivePath: string;
}

export interface IDeleteMapPayload {
  mapId: string;
}
