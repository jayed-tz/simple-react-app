import {SortParamType, TableRowType} from "./Table";

export type TableAction = {
    type: 'sort' | 'populate' | 'filter',
    sortParamType?: SortParamType,
    rows?: Array<TableRowType>,
    activeFilterMap?: Record<string, string | null>
};