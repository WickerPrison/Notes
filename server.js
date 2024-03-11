const express = require('express');
const bodyParser = require('body-parser');
const { saveNote } = require('./writeAndRead.js');
const path = require('path');
const PORT = 3001;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.post('/api/notes', (req, res) => {
    saveNote(req.body);
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});