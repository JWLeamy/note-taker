const path = require("path");
const router = require("express").Router()

    // GET request HTML
    router.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    }); 

    // Get request to return homepage to the index.html
    router.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
    });

module.exports = router;