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

  app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

function newNote(content, allNotesArray) {
    const newNote = content;
    if (!Array.isArray(allNotesArray))
        allNotesArray = [];
    
    if (allNotesArray.length === 0)
        allNotesArray.push(0);

    content.id = allNotesArray[0];
    allNotesArray[0]++;

    allNotesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(allNotesArray, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = newNote(req.content, allNotes);
    res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});