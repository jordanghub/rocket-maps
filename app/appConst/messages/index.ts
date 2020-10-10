import MESSAGES_FR from './messages_fr.json';
import MESSAGES_EN from './messages_en.json';

export enum IMessagesLabelKey {
  MAP_FOLDER_DOESNT_EXIST = 'MAP_FOLDER_DOESNT_EXIST',
  GAME_FOLDER_DOESNT_EXIST = 'GAME_FOLDER_DOESNT_EXIST',
  GAME_MAP_FOLDER_DOESNT_EXIST = '',
  MAP_DOESNT_EXIST = 'GAME_MAP_FOLDER_DOESNT_EXIST',
  MAP_CHANGE_STARTED = 'MAP_CHANGE_STARTED',
  MAP_CHANGE_ERROR = 'MAP_CHANGE_ERROR',
  MAP_CHANGE_SUCCESS = 'MAP_CHANGE_SUCCESS',
  MAP_PATH_LABEL = 'MAP_PATH_LABEL',
  GAME_PATH_LABEL = 'GAME_PATH_LABEL',
  CHANGE_GAME_PATH_LABEL = 'CHANGE_GAME_PATH_LABEL',
  CHANGE_MAP_PATH_LABEL = 'CHANGE_MAP_PATH_LABEL',
  REPLACEMENT_MAP_LABEL = 'REPLACEMENT_MAP_LABEL',
  RESET_REPLACEMENT_MAP_LABEL = 'RESET_REPLACEMENT_MAP_LABEL',
  MAP_LIST_TITLE = 'MAP_LIST_TITLE',
  SEARCH_PLACEHOLDER = 'SEARCH_PLACEHOLDER',
  NO_MAP_PREVIEW_LABEL = 'NO_MAP_PREVIEW_LABEL',

  OPEN_SETTINGS_LABEL = 'OPEN_SETTINGS_LABEL',
  SETTINGS_PANEL_TITLE = 'SETTINGS_PANEL_TITLE',
  NO_PATH_DETECTED = 'NO_PATH_DETECTED',
  NO_SEARCH_RESULT = 'NO_SEARCH_RESULT',
  NO_MAPS = 'NO_MAPS',
  WORKSHOP_LINK_LABEL = 'WORKSHOP_LINK_LABEL',
  WORSKHOP_DOWNLOAD_LINK_LABEL = 'WORSKHOP_DOWNLOAD_LINK_LABEL',
}

export type IMessagesLabel = {
  [K in keyof typeof IMessagesLabelKey]: string;
};

export function getMessages(locale: string = 'en'): IMessagesLabel {
  switch (locale) {
    case 'fr': {
      return MESSAGES_FR;
    }

    case 'en': {
      return MESSAGES_EN;
    }

    default: {
      return MESSAGES_EN;
    }
  }
}