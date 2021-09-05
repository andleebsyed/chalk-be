const express = require("express");
const { AddNote, RemovePin, PinNote } = require("../controllers/notes");
const notesRoute = express.Router();
notesRoute.post("/add", AddNote);
notesRoute.post("/removepin", RemovePin);
notesRoute.post("/pinnote", PinNote);
module.exports = { notesRoute };
