import React, {memo, useCallback, useEffect, useState} from "react";
import {TableHeaderType} from "../../types/Table";
import classNames from "./TableHeader.module.css";
import {ReactComponent as AscendingIcon} from "./order-ascending.svg";
import {ReactComponent as DescendingIcon} from "./order-descending.svg";
import {SortDirection} from "../../enums/SortDirection";

const TableHeader: React.FC<TableHeaderType> = ({
                                                    columns,
                                                    sortDirection,
                                                    sortColumn,
                                                    onSort = () => {
                                                    },
                                                    onFilter = () => {
                                                    },
                                                }) => {
    // State Hooks Begin
    const [localSortDirection, setLocalSortDirection] = useState<SortDirection>(sortDirection || SortDirection.NONE);
    const [localSortColumn, setSortColumn] = useState<string>(sortColumn || null);
    // State Hooks End

    // Performance Hooks Begin
    const renderIcon = useCallback((id: string, title: string): React.ReactNode => {
        if (id !== localSortColumn) {
            return <></>;
        }
        switch (localSortDirection) {
            case SortDirection.NONE:
                return <></>;
            case SortDirection.ASCENDING:
                return <AscendingIcon
                    data-testid="ascending-icon"
                    aria-label={`Sorted by ${title} in ascending order`}
                />;
            case SortDirection.DESCENDING:
                return <DescendingIcon
                    data-testid="descending-icon"
                    aria-label={`Sorted by ${title} in descending order`}
                />;
        }
    }, [localSortColumn, localSortDirection])
    // Performance Hooks End

    // Effects Begin
    useEffect(() => {
        onSort({column: columns.find(c => c.id === localSortColumn), sortDirection: localSortDirection});
    }, [localSortDirection, localSortColumn, columns, onSort]);
    // Effects End

    const handleSortClick = (event: React.MouseEvent<HTMLLabelElement>, id: string) => {
        event.preventDefault();

        // on first click, set to ascending
        if (id !== localSortColumn) {
            setSortColumn(id);
            setLocalSortDirection(SortDirection.ASCENDING)

            return;
        }

        switch (localSortDirection) {
            case SortDirection.ASCENDING:
                setLocalSortDirection(SortDirection.DESCENDING);
                break;
            case SortDirection.DESCENDING:
                setLocalSortDirection(SortDirection.ASCENDING);
                break;
        }
    };

    const handleTextChanged = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        onFilter(id, e.target.value);
    }

    return (
        <thead>
        <tr>
            {columns.map(({id, title}) => (
                <th key={id} className={classNames.sorting}>
                    <button>
                        <label htmlFor={id} onClick={(event) => handleSortClick(event, id)}>
                            {title}
                        </label>
                        {renderIcon(id, title)}
                    </button>
                </th>
            ))}
        </tr>
        <tr>
            {columns.map(({id}) => (
                <th key={id} className={classNames.filtering}>
                    <input onChange={e => handleTextChanged(e, id)}/>
                </th>
            ))}
        </tr>
        </thead>
    );
};

export default memo(TableHeader);
