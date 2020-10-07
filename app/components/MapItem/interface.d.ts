export interface IMapItemProps {
  name: string;
  thumbnail: boolean;
  mapFolder: string;
  selected: boolean;
  noPreviewLabel: string;
  handleMapClick: (payload: any) => void;
  isVisible: boolean;
}
