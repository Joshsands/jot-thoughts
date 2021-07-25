const fs = require("fs");
const path = require("path");

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname + './Develop/public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
  });  

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});