const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const LabelSchema = Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  labelName: { type: String },
  labelNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});

const Label = model("Label", LabelSchema);

module.exports = { Label };
