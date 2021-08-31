const express = require("express");
const { SignUp, Login } = require("../controllers/users");
const userRoute = express.Router();

userRoute.post("/login", Login);
userRoute.post("/signup", SignUp);

module.exports = { userRoute };
