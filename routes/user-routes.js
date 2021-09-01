const express = require("express");
const { SignUp, Login, Account } = require("../controllers/users");
const { verifyToken } = require("../middlewares/verifyToken");
const userRoute = express.Router();

userRoute.post("/login", Login);
userRoute.post("/signup", SignUp);
userRoute.post("/account", verifyToken, Account);
module.exports = { userRoute };
