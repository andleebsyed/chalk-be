const express = require("express");
const {
  SignUp,
  Login,
  Account,
  UpdateAccount,
  UpdatePassword,
  FetchNotesData,
} = require("../controllers/users");
const { verifyToken } = require("../middlewares/verifyToken");
const userRoute = express.Router();

userRoute.post("/login", Login);
userRoute.post("/signup", SignUp);
userRoute.post("/account", verifyToken, Account);
userRoute.post("/update", verifyToken, UpdateAccount);
userRoute.post("/updatepassword", verifyToken, UpdatePassword);
userRoute.post("/fetchnotesdata", verifyToken, FetchNotesData);
module.exports = { userRoute };
