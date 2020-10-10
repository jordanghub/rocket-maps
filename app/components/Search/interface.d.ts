import { IFilterMethodName } from 'types/arrayFilter/arrayFilter';
import { ISortMethodName } from 'types/arraySort/interface';

export interface ISearchProps {
  handleChange: (payload: any) => void;
  searchValue: string;
  placeholder: string;
  handleSortButtonClick: (methodName: ISortMethodName) => void;
  selectedSortMethod: string;
  selectedFilterMethod: string;
  handleFilterButtonClick: (methodName: IFilterMethodName) => void;
}
