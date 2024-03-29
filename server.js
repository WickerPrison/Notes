const express = require('express');
const bodyParser = require('body-parser');
const { saveNote, deleteNote } = require('./public/assets/js/writeAndRead.js');
const path = require('path');
const PORT = 3001;
const fs = require('fs');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", (err, data) =>{
        if(err){
            console.error(err);
        }
        else{
            res.json(JSON.parse(data));
        }
    })
});

app.post('/api/notes', (req, res) => {
    saveNote(req.body);
    res.send("note added");
});

app.delete("/api/notes/:id", (req, res) =>{
    deleteNote(req.params.id);
    res.send("note deleted");
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});