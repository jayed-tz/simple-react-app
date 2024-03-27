import React, {useCallback, useEffect, useReducer} from "react";
import {SortParamType, TableType} from "../../types/Table";
import TableHeader from "../TableHeader/TableHeader";
import classNames from "./Table.module.css";
import {tableReducer} from "./Reducer/TableReducer";

const Table: React.FC<TableType> = ({
                                        rows,
                                        columns,
                                        initialSortColumn,
                                        initialSortDirection,
                                    }) => {
    // State Hooks Begin
    const [tableState, dispatch] = useReducer(tableReducer, {rows: rows, filteredRows: [...rows], sortParamType: null, activeFilterMap: columns.reduce((acc, column) => {
            acc[column.id] = null;
            return acc;
        }, {})});
    // State Hooks End

    // Effects Begin
    useEffect(() => {
        dispatch({ type: 'populate', rows: rows })
    }, [rows]);
    // Effects end

    const memoHandleSort = useCallback(
        (sortParamType: SortParamType) => {
            dispatch({ type: 'sort', sortParamType: sortParamType })
        },
        []
    );

    const memoHandleFilter = useCallback(
        (id: string, value: string) => {
            dispatch({ type: 'filter', activeFilterMap: {[id]: value ? value : null} });
        },
        []
    );

    const length = tableState.rows.length;

    return (
        <table title="Movies" className={classNames.table}>
            <TableHeader
                columns={columns}
                onSort={memoHandleSort}
                sortColumn={initialSortColumn}
                sortDirection={initialSortDirection}
                onFilter={memoHandleFilter}
            />
            <tbody>
            {length === 0 && <tr>
                <td colSpan={5}>No data</td>
            </tr>}
            {length !== 0 && tableState.filteredRows.map(r =>
                <tr key={r.number}>
                    <td>{r.number}</td>
                    <td>{r.title}</td>
                    <td>{r.releaseDate}</td>
                    <td>{r.productionBudget}</td>
                    <td>{r.worldwideBoxOffice}</td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default Table;
