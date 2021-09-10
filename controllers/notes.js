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
const RemovePin = async (req, res) => {
  try {
    const { noteId, userId } = req.body;
    const note = await Note.findById(noteId);
    note.pinned = false;
    const response = await note.save();
    await Note.populate(response, { path: "labels" });
    res.json({
      status: true,
      message: "pin removed successfully",
      unPinnedNote: response,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "failed to remove pin",
      errorDetail: error?.message,
    });
  }
};

const PinNote = async (req, res) => {
  try {
    const { noteId } = req.body;
    const note = await Note.findById(noteId);
    note.pinned = true;
    const response = await note.save();
    await Note.populate(response, { path: "labels" });
    res.json({
      status: true,
      message: "pinned note successfully",
      pinnedNote: response,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "failed to pin note",
      errorDetail: error?.message,
    });
  }
};

const UpdateNote = async (req, res) => {
  let msg;
  try {
    const { title, content, pinned, noteId, image } = req.body;
    let noteToUpdate = await Note.findById(noteId);
    noteToUpdate.title = title;
    noteToUpdate.content = content;
    noteToUpdate.pinned = pinned;
    //null, image was removed from client side
    //undefined, image  property of note was not touched with from client side
    noteToUpdate.image = image === "null" ? null : noteToUpdate.image;
    const labels = JSON.parse(req.body?.labels);
    const labelsKeys = labels?.map((label) =>
      mongoose.Types.ObjectId(label._id)
    );

    if (req?.files) {
      const image = req.files?.image;
      if (image !== undefined) {
        await cloudinary.uploader.upload(
          image.tempFilePath,
          async (err, result) => {
            if (err) {
              console.log("Error occurred while uploading file");
              msg = "image upload to cloudinary failed";
            } else {
              const imageLink = result.secure_url;
              noteToUpdate.image = imageLink;
            }
          }
        );
      }
    }

    if (labelsKeys) {
      noteToUpdate.labels = [];
      labelsKeys.map((labelKey) => noteToUpdate.labels.push(labelKey));
    }
    let updatedNote = await noteToUpdate.save();
    await Note.populate(updatedNote, { path: "labels" });

    return res.json({
      status: true,
      message: "note updated successsfully",
      updatedNote,
    });
  } catch (error) {
    msg = error?.message;
    return res.status(500).json({
      status: false,
      message: "failed to update note",
      errorDetail: msg,
    });
  }
};
const DeletNote = async (req, res) => {
  try {
    const { noteId, userId } = req.body;
    const user = await User.findById(userId);
    user.notes = user.notes.filter((userNote) => userNote._id !== noteId);
    await user.save();
    await Note.deleteOne({ _id: noteId });
    res.json({
      status: true,
      message: "note deleted successfully",
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      status: false,
      message: "deletion of note failed",
      errorDetail: error?.message,
    });
  }
};

module.exports = { AddNote, RemovePin, PinNote, UpdateNote, DeletNote };
