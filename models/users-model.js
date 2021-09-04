const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// const NoteSchema = Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//   },
//   pinned: {
//     type: Boolean,
//   },
//   color: {
//     type: String,
//   },
//   labels: [
//     {
//       type: String,
//     },
//   ],
// });
const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
});

const User = model("User", UserSchema);

module.exports = { User };
