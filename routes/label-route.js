const express = require("express");
const { AddLabel, DeleteLabel } = require("../controllers/labels");
const labelRoute = express.Router();
labelRoute.post("/addlabel", AddLabel);
labelRoute.post("/removelabel", DeleteLabel);
module.exports = { labelRoute };
