## Description
An appication that allows users to write, review, and save notes using Express.js!

## Installation and Usage
Content required for usage - Github, Express.JS (framework of node.js) & Heroku

Steps
1. Copy the atttached code to your perfered text editor and navigate to it's repository
2. Install the dependencies within the packaged json ('npm i' in command line)
3. After loggin into Heroku on your local device, run 'heroku create --insert_app_name--'
4. Once your heroku app is created, run 'git push heroku main' to push the existing code into your newly created application.
5. Start taking notes!


## User Story 
```
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
```

## Acceptance Criteria
```
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
```

## Code Snippet 
```
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
```





