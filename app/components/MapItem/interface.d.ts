export interface IMapItemProps {
  id: string;
  name: string;
  thumbnail: boolean;
  mapFolder: string;
  selected: boolean;
  noPreviewLabel: string;
  handleMapClick: (payload: any) => void;
  isVisible: boolean;
  isFavorite?: boolean;
  toggleMapFavoriteAction: (payload: any) => void;
  changeMapName: (payload: any) => void;
}
