const express = require("express");
const {
  AddNote,
  RemovePin,
  PinNote,
  UpdateNote,
} = require("../controllers/notes");
const notesRoute = express.Router();
notesRoute.post("/add", AddNote);
notesRoute.post("/removepin", RemovePin);
notesRoute.post("/pinnote", PinNote);
notesRoute.post("/update", UpdateNote);
module.exports = { notesRoute };
