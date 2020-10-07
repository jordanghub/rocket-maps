import fs from 'fs';
import { readdirSync } from 'fs';
import path from 'path';
import {
  addFlashMessageAction,
  changeMapListAction,
  changeSelectedMapAction,
  changeCurrentLocaleAction,
  changeMessagesAction,
} from 'store/features';
import chokidar from 'chokidar';

import { IState } from 'store/features/interface';
import { DEFAULT_MAP_REPLACEMENT_NAME, GAME_MAP_FOLDER } from 'appConst/path';
import { getMessages } from 'appConst/messages/index';
import { filterNumberDesc } from 'utils/arraySort/sortByDate';

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

  watcher.on('all', () => {
    dispatch(fetchMapListAction());
  });

  dispatch(fetchMapListAction());
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

  let file = fileList.find(
    (file) => path.extname(file) === '.upk' || path.extname(file) === '.udk'
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
        list: filteredMapList
          .filter((map: any) => map !== false)
          .sort((a, b) =>
            filterNumberDesc(
              // @ts-ignore
              new Date(a.createdAt).getTime(),
              // @ts-ignore
              new Date(b.createdAt).getTime()
            )
          ),
      })
    );
  } catch (err) {
    // Error
  }
};
export const changeLocaleAction = ({ localeCode }: any) => async (
  dispatch: any,
  getState: () => IState
) => {
  const { locale, localeList } = getState().app;

  // Ne pas changer la langue si c'est la même
  if (locale === localeCode) {
    return;
  }

  const newMessages = getMessages(localeCode);

  dispatch(changeCurrentLocaleAction({ locale: localeCode }));
  dispatch(changeMessagesAction({ messages: newMessages }));
};
