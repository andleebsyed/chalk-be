const express = require("express");
const {
  AddNote,
  RemovePin,
  PinNote,
  UpdateNote,
  DeletNote,
} = require("../controllers/notes");
const notesRoute = express.Router();
notesRoute.post("/add", AddNote);
notesRoute.post("/removepin", RemovePin);
notesRoute.post("/pinnote", PinNote);
notesRoute.post("/update", UpdateNote);
notesRoute.post("/delete", DeletNote);
module.exports = { notesRoute };
