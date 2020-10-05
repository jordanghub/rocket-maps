import fs from 'fs';

import { DATA_PATH, SETTINGS_PATH } from '../constants/path';

export const dataPathExists = () => {
  if (fs.existsSync(DATA_PATH)) {
    return true;
  }

  try {
    fs.mkdirSync(DATA_PATH);
    return true;
  } catch (err) {
    return false;
  }
};

export const changeSettingsKey = (key: string, value: string) => {
  if (!dataPathExists()) {
    return;
  }

  try {
    let data: any = {};

    const settingsFileExists = fs.existsSync(SETTINGS_PATH);

    if (settingsFileExists) {
      data = fs.readFileSync(SETTINGS_PATH);
    }

    if (settingsFileExists) {
      data = JSON.parse(data.toString());
    }

    data[key] = value;

    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(data));

    return true;
  } catch (err) {
    return false;
  }
};
