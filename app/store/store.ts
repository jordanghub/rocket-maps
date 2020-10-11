import { existsSync, readFileSync } from 'fs';

import { configureStore, getDefaultMiddleware, Action } from '@reduxjs/toolkit';
import { createHashHistory } from 'history';
import { createLogger } from 'redux-logger';
import { ThunkAction } from 'redux-thunk';
// eslint-disable-next-line import/no-cycle
import { getMessages } from 'appConst/messages/index';

import createRootReducer from './rootReducer';
import {
  changeCurrentLocaleAction,
  changeFavoriteMapListAction,
  changeMapFolderAction,
  changeMessagesAction,
  changeReplacementMapNameAction,
  changeRocketPathAction,
  changeSelectedMapAction,
} from './features';
import { SETTINGS_PATH } from '../appConst/path';

export const history = createHashHistory();
const rootReducer = createRootReducer(history);

export type RootState = ReturnType<typeof rootReducer>;

// const router = routerMiddleware(history);
const middleware = [
  ...getDefaultMiddleware({
    thunk: true,
  }),
];

const excludeLoggerEnvs = ['test', 'production'];
const shouldIncludeLogger = !excludeLoggerEnvs.includes(
  process.env.NODE_ENV || ''
);

if (shouldIncludeLogger) {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });
  middleware.push(logger);
}

export const configuredStore = (initialState?: RootState) => {
  // Create Store

  const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState: initialState,
  });

  try {
    if (existsSync(SETTINGS_PATH)) {
      const file = readFileSync(SETTINGS_PATH);

      const settings = JSON.parse(file.toString());

      if (settings.rocketPath) {
        store.dispatch(
          changeRocketPathAction({
            path: settings.rocketPath,
            init: true,
          })
        );
      }

      if (settings.mapPath) {
        store.dispatch(
          changeMapFolderAction({
            path: settings.mapPath,
            init: true,
          })
        );
      }
      if (settings.currentMap) {
        store.dispatch(
          changeSelectedMapAction({
            name: settings.currentMap,
            init: true,
          })
        );
      }
      if (settings.replacementMapName) {
        store.dispatch(
          changeReplacementMapNameAction({
            name: settings.replacementMapName,
            init: true,
          })
        );
      }
      if (settings.locale) {
        const newMessages = getMessages(settings.locale);

        store.dispatch(changeCurrentLocaleAction({ locale: settings.locale }));
        store.dispatch(changeMessagesAction({ messages: newMessages }));
      }
      if (settings.favoriteList) {
        store.dispatch(
          changeFavoriteMapListAction({
            favoriteMapList: settings.favoriteList,
          })
        );
      }
    }
    // eslint-disable-next-line no-empty
  } catch (err) {}

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept(
      './rootReducer',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('./rootReducer').default)
    );
  }
  return store;
};
export type Store = ReturnType<typeof configuredStore>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const store = configuredStore();

export type AppDispatch = typeof store.dispatch;
