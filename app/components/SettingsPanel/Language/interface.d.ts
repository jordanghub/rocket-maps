import { ILocaleListItem } from 'store/features/interface';

export interface ILanguageProps {
  selectedLocale: string;
  localeList: ILocaleListItem[];
  handleLocaleChange: (payload: any) => void;
}

export interface ILanguageItemProps {
  flagCode: string;
  handleChange: (evt: any) => void;
  isSelected: boolean;
}
