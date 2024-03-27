# Simple React app

This is a simple react app enhanced on a bare minimum code base for a front-end coding challenge. Part of the coding challenge description is mentioned below:

## Task 1 - ⏬ Data fetching

Your task is to fetch data from the data server and make it available to be consumed by the Table component. We provided a <DataSwitcher /> component to switch between different data sets. Once the data set is switched, the user should see the corresponding data in the table.
We have configured a proxy so requests to the data server are handled easily.
Example: if you are running your app on port 3000, then requests to localhost:3000/marvel are proxied to localhost:8000/marvel

Available endpoints from data server:
- GET /marvel
- GET /dc
- GET /james-bond

## Task 2 - 🔎 Filtering

Users of the app should be able to filter the table. They expressed that every column should include an input field where they could type their search. The table should then be filtered so that only rows that match the search term for the respective column are included. Your task is to make this possible!


## Task 3 - 🗄️ Sorting

Your task is to add a feature that let a user sort any table column. If you click the column title for the a first time, it should sort this column in ascending order. When you click the same column title again, this should toggle between ascending and descending.

## 📍 General hints

### 🎁 Installing dependencies

This project uses `yarn`.
You can run the following command to install all dependencies.

```sh
yarn install
```

### 💻 Running the data server

In this exercise, we provide a server that hosts the data. Please do not change any file in `./server` folder.

On a real world scenario, you could potentially discuss with backend developers to change the way the data is provided. In this exercise, our focus is on how you would handle the data in its current format. For this reason, _**we ask you not to change any content in `./server` directory**_.

To start the server, run the following command:

```sh
yarn start:server
```

### 🛠️ Running the dev server

To see what you're building, run the following command:

```sh
yarn start
```

It will start the dev-server and open a page in your default browser.

### 🧪 Testing

This project uses [`jest`](https://jestjs.io/) as a test runner.
The tests are written using [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro).
Also, we have enhanced the `expects` with [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom) to give you some more explicit assertions.

You can run all tests with the following command:

```sh
yarn test
```


## 📝 Design decisions and feedback

### Additional Packages (including dev)
1. `axios` was used as the HTTP client
2. `axios-mock-adapter` was used to mock the request
### Design Decision & Adjustments
A minimal structure suitable for this project may look like this:
```
src/
├── components/
│   ├── ...component folders...
├── constants/
│   └── ...constant files...
├── enums/
│   └── ...enum files...
├── providers/
│   └── ...provider files...
└── types/
    └── ...type files...
```
2. Memoization was employed where it was deemed necessary
3. Sort direction uses enum values instead of strings
4. The initial code base had components written in a mixed convention (general function and arrow function). This has been streamlined

### Less focused areas which could be improved
1. Much more tests
2. Potential usage of more reducer & other hooks, redux (redux is overkill for this scope, however, recommended if this code base is to enhance)
3. Routing (i.e. '/dc' would display the data from the dataset retrieved from the route)
4. Cell templates based on the data type
5. API response/error handling 
6. and more...