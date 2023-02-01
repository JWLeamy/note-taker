// Set variable now to avoid "let"/"var" later
var allNotes;
const fs = require("fs");
const util = require("util");
const { all } = require("./htmlRoutes");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

module.exports = function(app) { 

    // GET request - retrieves and presents data (notes) to the user
    app.get("/notes", (req, res) => {
        readFileAsync("../db/db.json", "utf8").then(function(data) {
            allNotes = JSON.parse(data);
            res.json(allNotes)
        })
    }); 

    // Post requests -  allows users to post data (notes) to the database
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
            console.log("This note has been added to the database!");
          });
          res.json(allNotes);
        });
      });

}