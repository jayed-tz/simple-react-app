import {act, render, screen} from "@testing-library/react";
import TableHeader from "./TableHeader";
import React from "react";
import {SortDirection} from "../../enums/SortDirection";

describe("DataSwitcher", () => {
  const descendingIconId = 'descending-icon';
  const ascendingIconId = 'ascending-icon';
  const columns = [
    { id: 'number', title: 'Number', type: 'number' },
    { id: 'title', title: 'Movie', type: 'text' },
    { id: 'releaseDate', title: 'Release Date', type: 'date' },
    { id: 'productionBudget', title: 'Production Budget', type: 'money' },
    { id: 'worldwideBoxOffice', title: 'Worldwide Box Office', type: 'money' },
  ];

  it("DESCENDING sort direction should render Descending Icon", async () => {
    let allOptions = null;
    await act(async () => {
      render(
          <table>
            <TableHeader
                columns={columns}
                sortColumn={columns[4].id}
                sortDirection={SortDirection.DESCENDING}
            />
          </table>
      );
    });

    expect(screen.getByTestId(descendingIconId)).toBeInTheDocument();
  });

  it("ASCENDING sort direction should render Ascending Icon", async () => {
    let allOptions = null;
    await act(async () => {
      render(
          <table>
            <TableHeader
                columns={columns}
                sortColumn={columns[4].id}
                sortDirection={SortDirection.ASCENDING}
            />
          </table>
      );
    });

    expect(screen.getByTestId(ascendingIconId)).toBeInTheDocument();
  });
});
