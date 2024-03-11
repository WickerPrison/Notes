const { json } = require('body-parser');
const fs = require('fs');

function saveNote(newNote){
    fs.readFile("./db/db.json", (err, data) =>{
        if(err){
            console.error(err);
        }
        else{
            const dataArray = JSON.parse(data);
            dataArray.push(newNote);
            fs.writeFile("./db/db.json", JSON.stringify(dataArray), () =>
                err ? console.error(err) : console.info("Note Saved")
            );
        }
    })
}


module.exports = { saveNote };