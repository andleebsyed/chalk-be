const { Note } = require("../models/notes-model");
const { User } = require("../models/users-model");
const mongoose = require("mongoose");
const AddNote = async (req, res) => {
  try {
    const { userId, title, content, pinned } = req.body;
    const labels = JSON.parse(req.body.labels);
    const labelsKeys = labels.map((label) =>
      mongoose.Types.ObjectId(label._id)
    );
    const noteData = { title, content, pinned };
    const image = req?.files?.image;
    if (image) {
    }
    const newNote = new Note(noteData);
    let tempSavedNote = await newNote.save();
    if (labelsKeys) {
      labelsKeys.map((labelKey) => tempSavedNote.labels.push(labelKey));
      tempSavedNote = await tempSavedNote.save();
      Note.populate(tempSavedNote, { path: "labels" }, function (err) {
        console.log("error occured while saving the labels ", err?.message);
      });
    }

    user = await User.findById(userId);
    user.notes.push(tempSavedNote._id);
    const userUpdate = await user.save();
    res.json({
      status: true,
      message: "note added successsfully",
      newSavedNote: tempSavedNote,
      userUpdate,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "failed to add the note",
      errorDetail: error?.message,
    });
  }
};

module.exports = { AddNote };
