const fs = require("fs");
const util = require("util");
const app = require("express").Router();
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
var allNotes;

//module.exports = function(app) {
// GET request
app.get("/notes", (req, res) => {
  // Reads the notes from JSON file
  readFileAsync("db/db.json", "utf8").then(function (data) {
    // Parse data to get an array of objects
    allNotes = JSON.parse(data);
    //
    res.json(allNotes);
  });
});

// POST  request
app.post("/notes", (req, res) => {
  readFileAsync("db/db.json", "utf8").then(function (data) {
    // Parse data to get an array of objects
    allNotes = JSON.parse(data);

    let newNote = req.body;
    let currentID = allNotes.length;

    newNote.id = currentID + 1;
    // Add new note to the array of note objects
    allNotes.push(newNote);

    allNotes = JSON.stringify(allNotes);

    writeFileAsync("db/db.json", allNotes).then(function (data) {
      console.log("Note has been added.");
    });
    res.json(allNotes);
  });
});

// DELETE request
app.delete("/notes/:id", (req, res) => {
  let selID = parseInt(req.params.id);
  //  Read JSON file
  for (let i = 0; i < allNotes.length; i++) {
    if (selID === allNotes[i].id) {
      allNotes.splice(i, 1);
      let noteJSON = JSON.stringify(allNotes, null, 2);

      writeFileAsync("db/db.json", noteJSON).then(function () {
        console.log("Note has been deleted.");
      });
    }
  }
  res.json(allNotes);
});
//};

module.exports = app;