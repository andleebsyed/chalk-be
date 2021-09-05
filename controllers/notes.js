const { Note } = require("../models/notes-model");
const { User } = require("../models/users-model");
const mongoose = require("mongoose");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const AddNote = async (req, res) => {
  try {
    const { userId, title, content, pinned } = req.body;
    const labels = JSON.parse(req.body.labels);
    const labelsKeys = labels.map((label) =>
      mongoose.Types.ObjectId(label._id)
    );
    let noteData = { title, content, pinned };
    const image = req?.files?.image;
    if (image) {
      await cloudinary.uploader.upload(
        image.tempFilePath,
        async (err, result) => {
          if (err) {
            console.log("Error occurred while uploading file");
          } else {
            console.log("image uplaod success");
            const imageLink = result.secure_url;
            noteData = {
              ...noteData,
              image: imageLink,
            };
          }
        }
      );
    }
    const newNote = new Note(noteData);
    let tempSavedNote = await newNote.save();
    if (labelsKeys) {
      labelsKeys.map((labelKey) => tempSavedNote.labels.push(labelKey));
      tempSavedNote = await tempSavedNote.save();
      Note.populate(tempSavedNote, { path: "labels" });
    }

    user = await User.findById(userId);
    user.notes.push(tempSavedNote._id);
    const userUpdate = await user.save();
    return res.json({
      status: true,
      message: "note added successsfully",
      newSavedNote: tempSavedNote,
      userUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "failed to add the note",
      errorDetail: error,
    });
  }
};

module.exports = { AddNote };
