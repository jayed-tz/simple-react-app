import React from 'react'
import classNames from "./App.module.css";
import { TableContainer, DataSwitcher } from "./components";
import {TableDataProvider} from "./providers";

const App = () => {
  return (
    <div className={classNames.app}>
      <TableDataProvider>
        <DataSwitcher />
        <TableContainer />
      </TableDataProvider>
    </div>
  );
}

export default App;
