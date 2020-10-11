import { createSlice } from '@reduxjs/toolkit';
import { getMessages } from 'appConst/messages/index';
import { DEFAULT_MAP_REPLACEMENT_NAME } from 'appConst/path';
import { changeSettingsKey } from '../../../utils/changeSettingsKey';
import {
  IAppState,
  IChangeSearchValueAction,
  IChangeRocketPathAction,
  IChangeMapFolderAction,
  IChangeMapListAction,
  IChangeSelectedMapAction,
  IAddFlashMessageAction,
  IChangeReplacementMapNameAction,
  IChangeCurrentLocaleAction,
  IChangeMessagesAction,
  IAddToFavoriteAction,
  IRemoveFromFavoriteAction,
  IChangeFavoriteMapListAction,
  IChangeIsNewMapModalOpenAction,
} from '../interface';

const initialState: IAppState = {
  rocketPath: '',
  mapList: [],
  mapFolder: '',
  isSettingsOpen: false,
  selectedMap: '',
  flashMessages: [],
  searchValue: '',
  replacementMapName: DEFAULT_MAP_REPLACEMENT_NAME,
  locale: 'en',
  messages: getMessages('en'),
  localeList: [
    { flagCode: 'us', localeCode: 'en' },
    { flagCode: 'fr', localeCode: 'fr' },
  ],
  favoriteMapList: [],
  isNewMapModalOpened: false,
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeRocketPathAction: (state, action: IChangeRocketPathAction) => {
      if (!action.payload.init) {
        changeSettingsKey('rocketPath', action.payload.path);
      }
      state.rocketPath = action.payload.path;
    },
    changeMapFolderAction: (state, action: IChangeMapFolderAction) => {
      if (!action.payload.init) {
        changeSettingsKey('mapPath', action.payload.path);
      }
      state.mapFolder = action.payload.path;
    },
    changeMapListAction: (state, action: IChangeMapListAction) => {
      state.mapList = action.payload.list;
    },
    openSettingsPanelAction: (state) => {
      state.isSettingsOpen = true;
    },

    closeSettingsPanelAction: (state) => {
      state.isSettingsOpen = false;
    },

    changeSelectedMapAction: (state, action: IChangeSelectedMapAction) => {
      if (!action.payload.init) {
        changeSettingsKey('currentMap', action.payload.name);
      }
      state.selectedMap = action.payload.name;
    },

    addFlashMessageAction: (state, action: IAddFlashMessageAction) => {
      state.flashMessages = [
        ...state.flashMessages,
        {
          ...action.payload,
        },
      ];
    },
    clearFlashMessagesAction: (state) => {
      state.flashMessages = [];
    },

    changeSearchValueAction: (state, action: IChangeSearchValueAction) => {
      state.searchValue = action.payload.searchValue;
    },

    changeReplacementMapNameAction: (
      state,
      action: IChangeReplacementMapNameAction
    ) => {
      if (!action.payload.init) {
        changeSettingsKey('replacementMapName', action.payload.name);
      }
      state.replacementMapName = action.payload.name;
    },

    changeCurrentLocaleAction: (state, action: IChangeCurrentLocaleAction) => {
      if (!action.payload.init) {
        changeSettingsKey('locale', action.payload.locale);
      }

      state.locale = action.payload.locale;
    },

    changeMessagesAction: (state, action: IChangeMessagesAction) => {
      state.messages = action.payload.messages;
    },

    addToFavoriteAction: (state, action: IAddToFavoriteAction) => {
      changeSettingsKey('favoriteList', [
        ...state.favoriteMapList,
        action.payload.mapId,
      ]);
      state.favoriteMapList.push(action.payload.mapId);
    },
    removeFromFavoriteAction: (state, action: IRemoveFromFavoriteAction) => {
      changeSettingsKey('favoriteList', [
        state.favoriteMapList.filter((m) => m !== action.payload.mapId),
      ]);
      state.favoriteMapList = state.favoriteMapList.filter(
        (m) => m !== action.payload.mapId
      );
    },

    changeFavoriteMapListAction: (
      state,
      action: IChangeFavoriteMapListAction
    ) => {
      state.favoriteMapList = action.payload.favoriteMapList;
    },

    changeIsNewMapModalOpenAction: (
      state,
      action: IChangeIsNewMapModalOpenAction
    ) => {
      state.isNewMapModalOpened = action.payload.status;
    },
  },
});

export default app.reducer;

export const {
  changeRocketPathAction,
  changeMapListAction,
  changeMapFolderAction,
  openSettingsPanelAction,
  closeSettingsPanelAction,
  changeSelectedMapAction,
  addFlashMessageAction,
  clearFlashMessagesAction,
  changeSearchValueAction,
  changeReplacementMapNameAction,
  changeCurrentLocaleAction,
  changeMessagesAction,
  addToFavoriteAction,
  changeFavoriteMapListAction,
  removeFromFavoriteAction,
  changeIsNewMapModalOpenAction,
} = app.actions;
