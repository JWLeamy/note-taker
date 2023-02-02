// require all neccesary paths for the following functions
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;


// Middleware to parse the JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public/assets", express.static(__dirname + "/public/assets"));


require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);


// PORT
app.listen(PORT,() => {
    console.log(`App listening at http://localhost:${PORT} 🚀`);
});
