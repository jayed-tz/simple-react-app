import {act, render} from "@testing-library/react";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from "./App";

const mock = new MockAdapter(axios);
it("renders without crashing", async () => {
  mock.onGet('/marvel').reply(200,  [{"title":"Iron Man","releaseDate":"02-05-2008","productionBudget":140000000,"worldwideBoxOffice":585174222,"number":1}]);
  await act(() => render(<App/>));
});
