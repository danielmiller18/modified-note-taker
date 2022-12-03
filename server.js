// to require all dependencies

const express = require('express');
const path = require('path');


const fs = require("fs");


// // to creat an express application
const app = express()
var PORT = 3000;
app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({extended: true}))

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
        if(error){
            return console.log(error)
        }
        res.json(JSON.parse(notes))
    })
})


// we will use POST method to bring the user input towards the back end

app