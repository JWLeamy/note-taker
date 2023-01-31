const allNotes = require("../db/db.json");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

module.exports = function(app) { 

    // GET request - retrieves and presents data (notes) to the user
    app.get("/api/notes", (req, res) => {
        readFileAsync("../db/db.json", "utf8").then(function(data) {
            allNotes = JSON.parse(data);
            res.json(allNotes)
        })
    }); 

    // Post requests -  allows users to post data (notes) to the database
    app.post("/api/notes", (req, res) => {
        allNotes.push(req.body);
        res.json("Saved");
    });

}