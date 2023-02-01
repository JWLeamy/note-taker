// require all neccesary paths for the following functions
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const express = require('express');
const app = express();
const PORT = 3001;

// Folder to retrieve CSS and JS Files
app.use(express.static('public'));
// Middleware to parse the JSON data
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Add routes for HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// PORT
app.listen(PORT,() => {
    console.log(`App listening at http://localhost:${PORT} 🚀`);
});

module.exports = app;