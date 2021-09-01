const express = require("express");
const { SignUp, Login, Account } = require("../controllers/users");
const userRoute = express.Router();

userRoute.post("/login", Login);
userRoute.post("/signup", SignUp);
userRoute.post("/account", Account);
module.exports = { userRoute };
