import { createSlice } from '@reduxjs/toolkit';
import { getMessages } from 'appConst/messages/index';
import { DEFAULT_MAP_REPLACEMENT_NAME } from 'appConst/path';
import { changeSettingsKey } from '../../../utils/changeSettingsKey';
import { IAppState } from '../interface';

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
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeRocketPathAction: (state, action) => {
      if (!action.payload.init) {
        changeSettingsKey('rocketPath', action.payload.path);
      }
      state.rocketPath = action.payload.path;
    },
    changeMapFolderAction: (state, action) => {
      if (!action.payload.init) {
        changeSettingsKey('mapPath', action.payload.path);
      }
      state.mapFolder = action.payload.path;
    },
    changeMapListAction: (state, action) => {
      state.mapList = action.payload.list;
    },
    openSettingsPanelAction: (state) => {
      state.isSettingsOpen = true;
    },

    closeSettingsPanelAction: (state) => {
      state.isSettingsOpen = false;
    },

    changeSelectedMapAction: (state, action) => {
      if (!action.payload.init) {
        changeSettingsKey('currentMap', action.payload.name);
      }
      state.selectedMap = action.payload.name;
    },

    addFlashMessageAction: (state, action) => {
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

    changeSearchValueAction: (state, action) => {
      state.searchValue = action.payload.searchValue;
    },

    changeReplacementMapNameAction: (state, action) => {
      if (!action.payload.init) {
        changeSettingsKey('replacementMapName', action.payload.name);
      }
      state.replacementMapName = action.payload.name;
    },

    changeCurrentLocaleAction: (state, action) => {
      if (!action.payload.init) {
        changeSettingsKey('locale', action.payload.locale);
      }

      state.locale = action.payload.locale;
    },

    changeMessagesAction: (state, action) => {
      state.messages = action.payload.messages;
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
} = app.actions;
