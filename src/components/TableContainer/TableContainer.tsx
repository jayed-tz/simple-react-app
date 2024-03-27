import React, {useMemo} from "react";
import Table from "../Table/Table";
import {useTableData} from "../../providers";
import {SortDirection} from "../../enums/SortDirection";
import {columns} from "../../constants/TableColumns";

const TableContainer: React.FC = () => {
  // Performance Hooks Begin
  const memoColumn = useMemo(() => columns, []);
  // Performance Hooks End

  const { data } = useTableData();

  return !data? <></> : (
    <Table
      rows={data}
      columns={memoColumn}
      initialSortColumn="number"
      initialSortDirection={SortDirection.ASCENDING}
    />
  );
}

export default TableContainer;
