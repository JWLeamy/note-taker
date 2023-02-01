const path = require("path");
const router = require("express").Router()

    // GET request HTML
    router.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
        console.log("htmlroutes working notes");
    }); 

    // Get request to return homepage to the index.html
    router.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
        console.log("htmlroutes working index");

    });

module.exports = router;