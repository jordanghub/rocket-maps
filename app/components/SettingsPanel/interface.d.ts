import { ILocaleListItem } from 'store/features/interface';

export interface ISettingsPanelProps {
  handleClose: () => void;
  rocketPath: string;
  mapPath: string;
  handleRocketPathChange: (payload: any) => void;
  handleMapPathChange: (payload: any) => void;
  handleReplacementMapChange: (value: string) => void;
  resetReplacementMapName: () => void;
  mapName: string;
  localeList: ILocaleListItem[];
  handleLocaleChange: (payload: any) => void;
  selectedLocale: string;
  isVisible: boolean;
}
