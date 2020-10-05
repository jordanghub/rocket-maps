import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_MAP_REPLACEMENT_NAME } from 'constants/path';
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
} = app.actions;
