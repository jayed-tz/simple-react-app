import {act, fireEvent, render} from "@testing-library/react";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import DataSwitcher from "./DataSwitcher";
import TableDataProvider from "../../providers/TableDataProvider";
import {dataSets} from "../../constants/DataSets";

describe("DataSwitcher", () => {
  const mock = new MockAdapter(axios);
  mock.onGet('/marvel').reply(200,  [{"title":"Iron Man","releaseDate":"02-05-2008","productionBudget":140000000,"worldwideBoxOffice":585174222,"number":1}]);
  mock.onGet('/dc').reply(200,  [{"title":"Batman","releaseDate":"02-05-2008","productionBudget":140000000,"worldwideBoxOffice":585174222,"number":1}]);


  it("renders options with correct selected states", async () => {
    let allOptions = null;
    await act(async () => {
      const { getAllByTestId } = render(
          <TableDataProvider>
            <DataSwitcher />
          </TableDataProvider>
      );

      allOptions = {getAllByTestId};
    });

    const options = allOptions.getAllByTestId("dataset-option") as Array<HTMLOptionElement>;

    // Expectations after state updates have been processed
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
  });

  it("should have first option selected", async () => {
    let allOptions = null;
    await act(async () => {
      const { getAllByTestId, getByTestId } = render(
          <TableDataProvider>
            <DataSwitcher />
          </TableDataProvider>
      );

      allOptions = {getAllByTestId, getByTestId};
    });

    await act(async () => {
      fireEvent.change(allOptions.getByTestId("dataset-switcher"), {
        target: { value: dataSets[1].id },
      });
    });

    const options = allOptions.getAllByTestId("dataset-option") as Array<HTMLOptionElement>;
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
  });
});
