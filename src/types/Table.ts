import {SortDirection} from "../enums/SortDirection";

export type TableType = {
  rows: Array<TableRowType>;
  columns: Array<TableColumnType>;
  initialSortColumn?: string;
  initialSortDirection?: SortDirection;
};

export type SortParamType = {column: TableColumnType, sortDirection: SortDirection};
export type TableHeaderType = {
  columns: Array<TableColumnType>;
  sortDirection?: SortDirection;
  sortColumn?: string;
  onSort?: (sortParamType: SortParamType) => void; // UPDATED TYPE from str to enum
  onFilter?: (id: string, value: string) => void;
};
export type TableColumnType = { id: string; title: string, type: string };
export type CellDataType = string | number | undefined | null;
export type TableRowType = Record<string, CellDataType>
