const PORT = process.env.PORT || 3001;
const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

const allNotes = require("./Develop/db/db.json");

app.use(express.json());
app.use(express.static("Develop/public"));

app.get("/api/notes", (req, res) => {
  res.json(allNotes.slice(1));
});

// return the notes.html file when user clicks on get started button path to root/notes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

// return index.html when user opens root/homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

// creates a nee note and adds to array in db.json
function createNote(body, allNotesArray) {
  const newNote = body;
  if (!Array.isArray(allNotesArray)) allNotesArray = [];

  if (allNotesArray.length === 0) allNotesArray.push(0);

  body.id = allNotesArray[0];
  allNotesArray[0]++;

  allNotesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "./Develop/db/db.json"),
    JSON.stringify(allNotesArray, null, 2)
  );
  return newNote;
}

// runs the createNote function and displays it
app.post("/api/notes", (req, res) => {
  const newNote = createNote(req.body, allNotes);
  res.json(newNote);
});

// deletes the note stored in the db.json file
function deleteNote(id, allNotesArray) {
  for (let i = 0; i < allNotesArray.length; i++) {
    let note = allNotesArray[i];

    if (note.id == id) {
      allNotesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "./Develop/db/db.json"),
        JSON.stringify(allNotesArray, null, 2)
      );
      break;
    }
  }
}

// runs the deleteNote function on the id selected
app.delete("/api/notes/:id", (req, res) => {
  deleteNote(req.params.id, allNotes);
  res.json(true);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
