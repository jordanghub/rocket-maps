/* eslint-disable consistent-return */
import fs, { readdirSync } from 'fs';
import path from 'path';

import {
  addFlashMessageAction,
  changeMapListAction,
  changeSelectedMapAction,
  changeCurrentLocaleAction,
  changeMessagesAction,
  addToFavoriteAction,
  removeFromFavoriteAction,
} from 'store/features';
import chokidar from 'chokidar';

import extractZip from 'extract-zip';

import { v4 as uuid } from 'uuid';

import { IState } from 'store/features/interface';
import { DEFAULT_MAP_REPLACEMENT_NAME, GAME_MAP_FOLDER } from 'appConst/path';
import { getMessages } from 'appConst/messages/index';
import { createAsyncThunk } from '@reduxjs/toolkit/';
import { AppDispatch } from 'index';
import debounce from 'lodash.debounce';

interface IChangeFavoriteList {
  isFavorite: boolean;
  mapId: string;
}

interface IChangeMapName {
  newMapName: string;
  mapId: string;
}

export const toggleFavoriteAction = ({
  isFavorite,
  mapId,
}: IChangeFavoriteList) => async (dispatch: any) => {
  if (!isFavorite) {
    dispatch(addToFavoriteAction({ mapId }));
    return;
  }
  dispatch(removeFromFavoriteAction({ mapId }));
};

export const changeMapNameAction = ({
  newMapName,
  mapId,
}: IChangeMapName) => async (dispatch: any, getState: () => IState) => {
  const { mapList, mapFolder } = getState().app;

  if (newMapName.trim() === '') {
    // Le nom est vide
    dispatch(
      addFlashMessageAction({
        message: 'Le nom de la map ne peut pas être vide',
        config: {
          type: 'error',
        },
      })
    );
    return;
  }

  const mapToChange = mapList.find((map) => map.id === mapId);

  if (!mapToChange || !fs.existsSync(path.join(mapFolder, mapToChange.name))) {
    dispatch(
      addFlashMessageAction({
        message: "La map n'existe pas",
        config: {
          type: 'error',
        },
      })
    );
    return;
  }

  if (fs.existsSync(path.join(mapFolder, newMapName))) {
    dispatch(
      addFlashMessageAction({
        message: 'Une map existe déjà avec ce nom',
        config: {
          type: 'error',
        },
      })
    );
    // La avec ce nom existe déjà

    return;
  }

  try {
    fs.renameSync(
      path.join(mapFolder, mapToChange.name),
      path.join(mapFolder, newMapName)
    );
    // eslint-disable-next-line no-empty
  } catch (err) {}
};

export const selectMapAction = ({ name }: any) => async (
  dispatch: any,
  getState: () => IState
) => {
  const { messages } = getState().app;
  // Flash message pour annoncer que le changement de map a commencé

  dispatch(
    addFlashMessageAction({
      message: messages.MAP_CHANGE_STARTED,
      config: {
        type: 'warning',
      },
    })
  );

  const { rocketPath, mapFolder } = getState().app;

  const gameMapsFolder = path.join(rocketPath, GAME_MAP_FOLDER);
  const selectedMapFolder = path.join(mapFolder, name);

  // Vérifier que le dossier du jeu est correct

  if (
    !fs.existsSync(gameMapsFolder) ||
    !fs.lstatSync(gameMapsFolder).isDirectory()
  ) {
    // Le dossier des maps  n'existe pas

    dispatch(
      addFlashMessageAction({
        message: messages.GAME_MAP_FOLDER_DOESNT_EXIST,
        config: {
          type: 'error',
        },
      })
    );
    return;
  }

  if (
    !fs.existsSync(selectedMapFolder) ||
    !fs.lstatSync(selectedMapFolder).isDirectory()
  ) {
    // Le dossier de la map selectionnée n'existe pas n'existe pas

    dispatch(
      addFlashMessageAction({
        message: messages.MAP_FOLDER_DOESNT_EXIST,
        config: {
          type: 'error',
        },
      })
    );
    return;
  }

  // Vérifier que le fichier de la map existe et le récupérer

  const fileList = fs.readdirSync(selectedMapFolder);

  const file = fileList.find(
    (fileName) =>
      path.extname(fileName) === '.upk' || path.extname(fileName) === '.udk'
  );

  if (!file) {
    // La map n'exsite pas
    dispatch(
      addFlashMessageAction({
        message: messages.MAP_DOESNT_EXIST,
        config: {
          type: 'error',
        },
      })
    );

    return;
  }

  try {
    fs.copyFileSync(
      path.join(mapFolder, name, file),
      path.join(gameMapsFolder, DEFAULT_MAP_REPLACEMENT_NAME)
    );
    // La copie a réussi
    dispatch(
      addFlashMessageAction({
        message: messages.MAP_CHANGE_SUCCESS,
        config: {
          type: 'success',
        },
      })
    );

    dispatch(changeSelectedMapAction({ name }));

    // Changer la map actuellement selectionnée dans le settings.json et dans le store
  } catch (err) {
    // La copie a échouée
    dispatch(
      addFlashMessageAction({
        message: messages.MAP_CHANGE_ERROR,
        config: {
          type: 'error',
        },
      })
    );
  }

  // Copier le fichier de la map en upk ou udk en le remplaçant dans le dossier des maps du jeu par Labs_CirclePillars_P.upk
};

export const fetchMapListAction = () => async (
  dispatch: any,
  getState: () => IState
) => {
  const { messages } = getState().app;

  const mapFolderPath = getState().app.mapFolder;

  if (!mapFolderPath || mapFolderPath === '') {
    return;
  }

  if (
    !fs.existsSync(mapFolderPath) ||
    !fs.lstatSync(mapFolderPath).isDirectory()
  ) {
    // Le dossier des maps n'existe pas

    dispatch(
      addFlashMessageAction({
        message: messages.MAP_FOLDER_DOESNT_EXIST,
        config: {
          type: 'error',
        },
      })
    );

    return;
  }

  try {
    // Récupérer la liste des maps

    const folderList = fs
      .readdirSync(mapFolderPath, {
        withFileTypes: true,
      })
      .filter((source) => source.isDirectory())
      .map((source) => source.name);

    const filteredMapList = folderList.map((name) => {
      // On récupère la liste des fichiers dans le dossier
      const fileList = readdirSync(path.join(mapFolderPath, name));

      // Vérification du fichier map-data.json

      const doesSettingsFileExists = fileList.find(
        (fileName) => fileName === 'map-data.json'
      );

      let mapId = '';
      // Si il n'existe pas il faut le créer et y ajouter un id

      if (!doesSettingsFileExists) {
        const generatedId = uuid();

        const mapData = {
          id: generatedId,
        };
        mapId = generatedId;

        fs.writeFileSync(
          path.join(mapFolderPath, name, 'map-data.json'),
          JSON.stringify(mapData)
        );
      } else {
        const file = fs.readFileSync(
          path.join(mapFolderPath, name, 'map-data.json')
        );

        const mapData = JSON.parse(file.toString());

        mapId = mapData.id;
      }

      // Vérification de la présence d'un fichier preview

      const previewFileAvailable =
        fileList.filter((fileName) => fileName === 'preview.png').length > 0;

      // Vérification du fichier de la map en .upk ou udk

      let files = [];

      files = fileList.filter(
        (file) => path.extname(file).toLocaleLowerCase() === '.upk'
      );

      if (files.length === 0) {
        files = fileList.filter(
          (file) => path.extname(file).toLocaleLowerCase() === '.udk'
        );
      }

      // Si il y a des fichiers la map est valide et on peut retourner les données dans le bon format

      if (files.length > 0) {
        return {
          id: mapId,
          name,
          isPreviewFileAvailable: previewFileAvailable,
          mapFileName: files[0],
          isVisible: true,
          createdAt: fs
            .statSync(path.join(mapFolderPath, name))
            .birthtime.toISOString(),
        };
      }

      // Sinon la map n'est pas valide

      return false;
    });

    dispatch(
      changeMapListAction({
        list: filteredMapList.filter((map) => map !== false),
      })
    );
  } catch (err) {
    // Error
  }
};
export const changeLocaleAction = ({ localeCode }: any) => async (
  dispatch: AppDispatch,
  getState: () => IState
) => {
  const { locale } = getState().app;

  // Ne pas changer la langue si c'est la même
  if (locale === localeCode) {
    return;
  }

  const newMessages = getMessages(localeCode);

  dispatch(changeCurrentLocaleAction({ locale: localeCode }));
  dispatch(changeMessagesAction({ messages: newMessages }));
};

export const addNewMapAction = createAsyncThunk(
  'app/addNewMapAsyncStatus',
  async ({ mapName, archivePath }: any, thunkApi) => {
    const { mapFolder } = (thunkApi.getState() as IState).app;

    //  Pas de dossier contenant les maps
    if (mapFolder === '' || !fs.existsSync(mapFolder)) {
      return;
    }
    try {
      if (fs.existsSync(path.join(mapFolder, mapName))) {
        // Une map existe déjà avec ce nom , cancel l'ajout
        return {
          mapName: 'Il y a déjà une map portant ce nom',
        };
      }

      if (!fs.existsSync(archivePath)) {
        // L'archive n'existe pas
        return {
          archivePath: "L'archive n'existe pas",
        };
      }

      await extractZip(archivePath, {
        dir: path.join(mapFolder, mapName),
      });

      thunkApi.dispatch(
        addFlashMessageAction({
          message: 'Map ajoutée avec succès',
          config: {
            type: 'success',
          },
        })
      );

      return true;

      // dispatch flash message, ajouté avec success ou quelque chose comme ça
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
);
export const initMapWatchAction = () => async (
  dispatch: any,
  getState: () => IState
) => {
  const mapFolderPath = getState().app.mapFolder;

  if (mapFolderPath && mapFolderPath === '') {
    return;
  }

  const watcher = chokidar.watch(mapFolderPath, {
    ignoreInitial: true,
  });

  const watcherEvent = debounce((name: string) => {
    if (name !== 'change') {
      dispatch(fetchMapListAction());
    }
  }, 100);

  watcher.on('all', watcherEvent);

  dispatch(fetchMapListAction());
};
