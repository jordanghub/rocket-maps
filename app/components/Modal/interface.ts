export interface IModalProps {
  isOpened: boolean;
  handleClose: () => void;
  background?: string;
  children: any;
}
