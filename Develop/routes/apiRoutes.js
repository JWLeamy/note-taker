// Set variable now to avoid "let"/"var" later
var allNotes;
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const app = require("express").Router();


// GET request - retrieves and presents data (notes) to the user
app.get("/notes", (req, res) => {
  readFileAsync("db/db.json", "utf8").then(function (data) {
    allNotes = JSON.parse(data);
    console.log("notes have rendered");
    console.log(allNotes);
    res.json(allNotes);
  });
});

// Post requests -  allows users to post data (notes) to the database
app.post("/notes", (req, res) => {
  readFileAsync("db/db.json", "utf8").then(function (data) {
    // Read the original database file to check what informtion already exists. Then store it in a variable
    allNotes = JSON.parse(data);

    let newNote = req.body;
    let currentID = allNotes.length;

    // Take the input and add an ID to it
    newNote.id = currentID + 1;
    // Add new input to the variable that holds the existing data (in this case - allNotes)
    allNotes.push(newNote);

    allNotes = JSON.stringify(allNotes);
    
    // replace the old db.son file by creating a new db.son file with updated user input
    writeFileAsync("db/db.json", allNotes).then(function (data) {
      console.log("This note has been added to the database!");
    });
    res.json(allNotes);
  });

});

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

module.exports = app;