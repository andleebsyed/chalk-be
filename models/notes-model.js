const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const NoteSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    pinned: {
      type: Boolean,
    },
    color: {
      type: String,
    },
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
  },
  { timestamps: true }
);

const Note = model("Note", NoteSchema);

module.exports = { Note };
