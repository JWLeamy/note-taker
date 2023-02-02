// Set variable now to avoid "let"/"var" later
const fs = require('fs');
const allNotes = require('../db/db.json');
const uniqid = require('uniqid');

module.exports = function(app) {

    app.get('/api/notes', (req, res) => {
      res.json(allNotes);
      console.log('yes');
    });
    
  
    app.post('/api/notes', (req, res) => {
      req.body['id'] = uniqid();
      allNotes.push(req.body);
      res.json(true);
      fs.writeFileSync('./db/db.json', JSON.stringify(allNotes))
    })
  
    app.delete('/api/notes/:id', (req, res) => {
      let findId = allNotes.findIndex(x => x.id === req.params.id);
      allNotes.splice(findId, 1); 
      fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));
      res.end();
    })
  
}