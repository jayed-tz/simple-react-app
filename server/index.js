/**
 * DO NOT MAKE CHANGES IN THIS FILE
 */
const express = require("express");
const app = express();
const host = "localhost";
const port = 8000;

const marvelMovies = require("./marvel-movies");
const dcMovies = require("./dc-movies");
const jamesBondMovies = require("./james-bond-movies");

const addNumberField = (list) =>
  list.map((entry, index) => ({
    ...entry,
    number: index + 1,
  }));

app.get("/marvel", (req, res) => {
  res.json(addNumberField(marvelMovies));
});

app.get("/dc", (req, res) => {
  res.json(addNumberField(dcMovies));
});

app.get("/james-bond", (req, res) => {
  res.json(addNumberField(jamesBondMovies));
});

app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
