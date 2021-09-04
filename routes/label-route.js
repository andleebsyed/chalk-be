const express = require("express");
const { AddLabel } = require("../controllers/labels");
const { verifyToken } = require("../middlewares/verifyToken");
const labelRoute = express.Router();
labelRoute.post("/addlabel", AddLabel);
module.exports = { labelRoute };
