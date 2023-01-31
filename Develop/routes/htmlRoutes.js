const path = require("path");

module.exports = function(app) {
    // GET request HTML
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
    }); 

    // Get request CSS
    app.get("/styles", (req, res) => {
        res.sendFile(path.join(__dirname, "../Develop/public/assets/css/styles.css"));
    });

    // Get request to return homepage to the index.html
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
    });

}
