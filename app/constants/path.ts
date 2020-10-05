import path, { dirname } from 'path';
import { remote } from 'electron';

export const DATA_PATH = path.join(
  remote.app.getPath('appData'),
  'rlmapselector'
);

export const SETTINGS_PATH = path.join(DATA_PATH, 'settings.json');
export const RESOURCES_PATH = remote.app.isPackaged
  ? path.join(process.resourcesPath, 'resources')
  : path.join(__dirname, '../resources');

export const getAssetPath = (...paths: string[]): string => {
  console.log(process.resourcesPath);

  return process.env.NODE_ENV === 'production'
    ? (dirname(remote.app.getPath('exe')) +
        '/resources/resources/' +
        paths.join('/')).replaceAll('\\', '/')
    : './' + paths.join('/');
};

export const GAME_MAP_FOLDER = path.join('TAGame', 'CookedPCConsole');

export const DEFAULT_MAP_REPLACEMENT_NAME = 'Labs_CirclePillars_P.upk';
