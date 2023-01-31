const allNotes = require("../db/db.json");


module.exports = function(app) { 
    // GET request
    app.get("/api/notes", (req, res) => {
        res.json(allNotes);
    }); 



}