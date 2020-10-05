export interface ISettingsPanelProps {
  handleClose: () => void;
  rocketPath: string;
  mapPath: string;

  handleRocketPathChange: (payload: any) => void;
  handleMapPathChange: (payload: any) => void;

  handleReplacementMapChange: (value: string) => void;
  mapName: string;
}
