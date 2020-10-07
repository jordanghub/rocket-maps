import { IMessagesLabel, IMessagesLabelKey } from 'appConst/messages';
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
}

export interface IState {
  app: IAppState;
}

export interface ILocaleListItem {
  flagCode: string;
  localeCode: string;
}
