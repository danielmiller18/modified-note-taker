// to require all dependencies

const express = require('express');
const path = require('path');


const fs = require("fs");


// // to creat an express application
const app = express()
var PORT = 3000;
app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({ extended: true }))

app.use(express.json());


//  user  correcting the page dpending  on url



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
})

// code to send JSON of notes if the user accesses the route /api/notes


app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "./Develop/db/db.json"), "utf8",

        (error, note) => {
            if (error) {
                return console.log(error)
            }
            res.json(JSON.parse(notes))
        })
})


// we will use POST method to bring the user input towards the back end

app.post("/api/notes", (req, res) => {
    const currentNote = req.body;


    fs.readFile(path.join(__dirname, "./Develop/db/db.json"), "utf8", (error, notes) => {
        if (error) {
            return console.log(error)
        }

        notes = JSON.parse(notes);


        // assign unique id to each new note depending onthe last ID when there will be noitems in notes array the we assign the id as a number i.e 10, 20
        if (notes.length > 0) {
            let lastId = notes[notes.length - 1].id;
            var id = parseInt(lastId) + 1;
        } else {
            var id = 10
        }

        // create a new note object

        let newNote = {
            title: currentNote.title,
            text: currentNote.text,
            id: id
        }
        // nerge a new note with existing notes array


        var newNotesArr = notes.concat(newNote)
        // write new array to db,json file and return it to your user

        fs.writeFile(path.join(_dirname, "/Develop/db/bd.json"), JSON.stringify(newNotesArr), (error, data) => {
            if (error) {
                return error
            }
            console.log(newNotesArr);
            res.json(newNotesArr)
        })

    })

})


// // Delete the chosen note using the deletehttp method

app.delete("/api/notes/:id", (req, res) => {
    let deleteId = JSON.parse(req, params.id);
    console.log("ID to be deleted: ", deleteId);
    fs.readFile(path.join(__dirname, "./Develop/db/db.json", "utf8", (error, notes) => {
        if (error) {
            return console.log(error)
        }
        let notesArray = JSON.parse(notes);
        // we can loop through notes array and remove note with id matching the one with the id deleted
        for (var i = 0; i < notesArray.length; i++) {
            if (deleteId == notesArray[i].id) {
                notesArray.splice(i, 1);

                fs.writeFile(path.join(__dirname, "./Develop/db.json"), JSON.stringify(notesArray), (error, data) => {
                    if (error) {
                        return error
                    }
                    console.log(notesArray) // to see what I am getting in notes array
                    res.json(notesArray)
                })
            }
        }

    }))
})


// initialize port to start listening to the server

app.listen(PORT, () => {})