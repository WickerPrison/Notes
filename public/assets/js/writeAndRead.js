const { json } = require('body-parser');
const fs = require('fs');
const uuid = require('./uuid.js');

const saveNote = (newNote) =>{
    fs.readFile("./db/db.json", (err, data) =>{
        if(err){
            console.error(err);
        } 
        else{
            newNote.id = uuid();
            const dataArray = JSON.parse(data);
            dataArray.push(newNote);
            fs.writeFile("./db/db.json", JSON.stringify(dataArray), () =>
                err ? console.error(err) : console.info("Note Saved")
            );
        }
    })
}

const deleteNote = (id) =>{
    fs.readFile("./db/db.json", (err, data) =>{
        if(err){
            console.error(err);
        } 
        else{
            const dataArray = JSON.parse(data);
            let index = getNoteIndex(id, dataArray);
            dataArray.splice(index, 1);
            fs.writeFile("./db/db.json", JSON.stringify(dataArray), () =>
                err ? console.error(err) : console.info("Note Deleted")
            );
        }
    })
}

const getNoteIndex = (id, dataArray) =>{
    for(let i = 0; i < dataArray.length; i++){
        if(dataArray[i].id == id){
            return i;
        }
    }
}

module.exports = { saveNote, deleteNote };