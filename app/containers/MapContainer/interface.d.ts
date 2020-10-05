export interface IMapContainerProps {
  mapList: any[];
  mapFolder: string;
  selectedMap: string;
  handleMapClick: (payload: any) => void;
}