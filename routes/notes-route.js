const express = require("express");
const { AddNote } = require("../controllers/notes");
const { verifyToken } = require("../middlewares/verifyToken");
const notesRoute = express.Router();
notesRoute.post("/add", AddNote);

module.exports = { notesRoute };
