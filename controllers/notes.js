const { Note } = require("../models/notes-model");
const { User } = require("../models/users-model");

const AddNote = async (req, res) => {
  try {
    console.log("is it coming here ", req.body, req?.files);

    const { userId, title, content, pinned, labels } = req.body;
    const noteData = { title, content, pinned, labels };

    const image = req?.files?.image;
    if (image) {
    }
    const newNote = new Note(noteData);
    const newSavedNote = await newNote.save();
    user = await User.findById(userId);
    console.log(user.notes, " user notes should be array");
    user.notes.push(newSavedNote._id);
    await user.save();
    res.json({
      status: true,
      message: "note added successsfully",
      newSavedNote,
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
