import React, {
  createContext,
  useContext, useEffect,
  useMemo,
  useState,
} from "react";
import { TableRowType } from "../types/Table";
import axios from "axios";
import {dataSets} from "../constants/DataSets";

type TableDataContextType = {
  data?: Array<TableRowType>;
  dataSet?: string;
  setDataSet?: (dataSet: string) => void;
};

const TableDataContext = createContext<TableDataContextType>({});
export const useTableData = () => useContext(TableDataContext);

const TableDataProvider = ({ children }: React.PropsWithChildren) => {
  const [dataSet, setDataSet] = useState<string>(dataSets[0].id);
  const [data, setData] = useState<Array<TableRowType>>([]);

  useEffect(() => {
    axios.get(`/${dataSet}`).then((response) => {
      setData(response.data);
    });
  }, [dataSet, setData]);

  const value = useMemo(
    () => ({
      data,
      dataSet,
      setDataSet
    }),
    [data, dataSet,setDataSet]
  );

  return (
    <TableDataContext.Provider value={value}>
      {children}
    </TableDataContext.Provider>
  );
}

export default TableDataProvider;
