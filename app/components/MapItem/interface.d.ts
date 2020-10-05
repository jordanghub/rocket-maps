export interface IMapItemProps {
  name: string;
  thumbnail: boolean; 
  mapFolder: string;
  selected: boolean;
  handleMapClick: (payload: any) => void;
}