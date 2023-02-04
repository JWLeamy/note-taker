const path = require("path");
const router = require("express").Router();


//Get request for general html notes page to render
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    // console.log("router get htmlroutes notes.html");
});

// Get request for Homepage html page to render
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    // console.log("router get htmlroutes index.html");
});

module.exports = router;