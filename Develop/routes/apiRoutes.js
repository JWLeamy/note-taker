const allNotes = require("../db/db.json");


module.exports = function(app) { 

    // GET request - retrieves and presents data (notes) to the user
    app.get("/api/notes", (req, res) => {
        res.json(allNotes);
    }); 

    // Post requests -  allows users to post data (notes) to the database
    app.post("/api/notes", (req, res) => {
        allNotes.push(req.body);
        res.json("Saved");
    });

}