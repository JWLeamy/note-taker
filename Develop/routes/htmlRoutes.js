const path = require("path");

module.exports = function(app) {
    // GET request
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
    }); 

}
