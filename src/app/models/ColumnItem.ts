import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import  { User } from 'src/app/models/user';

export class ColumnItem {
    name: string;
    listOfFilter: NzTableFilterList;
    // filterFn: NzTableFilterFn<User> | null;
    filterFn?: NzTableFilterFn;
    filterMultiple: boolean;

  }