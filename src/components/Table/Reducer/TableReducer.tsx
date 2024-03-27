import {TableColumnType, TableRowType} from "../../../types/Table";
import {compareDateStrings, compareStrings} from "../../AppUtils";
import {SortDirection} from "../../../enums/SortDirection";
import {TableAction} from "../../../types/TableAction";
import {TableState} from "../../../types/TableState";

const sortElements = (a: TableRowType, b: TableRowType, column: TableColumnType): number => {
    const aElement = a[column.id];
    const bElement = b[column.id];

    // handle undefined/null values
    if (aElement === null || aElement === undefined) {
        return bElement === null || bElement === undefined ? 0 : 1;
    } else if (bElement === null || bElement === undefined) {
        return -1;
    }

    switch (column.type) {
        case 'text':
            return compareStrings(aElement as string, bElement as string);
        case 'number':
        case 'money':
            return (aElement as number) - (bElement as number);
        case 'date':
            return compareDateStrings(aElement as string, bElement as string);
    }

    return 0;
}
export const tableReducer = (state: TableState, action: TableAction) => {
    if (action.type === 'populate') {
        return {
            ...state,
            rows: [...action.rows],
            filteredRows: [...action.rows]
        };
    }

    if (action.type === 'filter') {
        let filteredRows = state.rows;
        const activeFilterMap = {...state.activeFilterMap, ...action.activeFilterMap};
        for (const key in activeFilterMap) {
            if (activeFilterMap[key] === null) {
                continue;
            }

            filteredRows = filteredRows.filter(tr => key in tr && tr[key].toString().toLowerCase().startsWith(activeFilterMap[key].toLowerCase()))
        }

        return {
            ...state,
            filteredRows: filteredRows,
            activeFilterMap: {...activeFilterMap}
        };
    }


    if (action.type === 'sort') {
        switch (action.sortParamType.sortDirection) {
            case SortDirection.ASCENDING:
                return {
                    ...state,
                    filteredRows: [...state.filteredRows.sort((a, b) => sortElements(a, b, action.sortParamType.column))],
                    sortParamType: action.sortParamType
                }
            case SortDirection.DESCENDING:
                return {
                    ...state,
                    filteredRows: [...state.filteredRows.sort((a, b) => sortElements(b, a, action.sortParamType.column))],
                    sortParamType: action.sortParamType
                }
        }

        return state;
    }


    throw Error('Unknown action.');
}