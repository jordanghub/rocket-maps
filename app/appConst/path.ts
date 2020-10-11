import path, { dirname } from 'path';
import { remote } from 'electron';

export const DATA_PATH = path.join(
  remote.app.getPath('appData'),
  'rlmapselector'
);

export const SETTINGS_PATH =
  process.env.NODE_ENV === 'production'
    ? path.join(DATA_PATH, 'settings.json')
    : path.join(DATA_PATH, 'settings-dev.json');
export const RESOURCES_PATH = remote.app.isPackaged
  ? path.join(process.resourcesPath, 'resources')
  : path.join(__dirname, '../resources');

export const getAssetPath = (...paths: string[]): string => {
  return process.env.NODE_ENV === 'production'
    ? `${dirname(remote.app.getPath('exe'))}/resources/resources/${paths.join(
        '/'
      )}`.replaceAll('\\', '/')
    : './';
};

export const GAME_MAP_FOLDER = path.join('TAGame', 'CookedPCConsole');

export const DEFAULT_MAP_REPLACEMENT_NAME = 'Labs_CirclePillars_P.upk';
