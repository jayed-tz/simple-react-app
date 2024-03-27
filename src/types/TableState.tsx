import {SortParamType, TableRowType} from "./Table";

export type TableState = {
    rows: Array<TableRowType>,
    filteredRows: Array<TableRowType>,
    sortParamType: SortParamType,
    activeFilterMap: Record<string, string | null>
};