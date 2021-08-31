const express = require("express");
const { CreateDatabaseConnection } = require("./db/dbConnection");
const { errorHandler } = require("./middlewares/errorHandler");
const { routeNotFound } = require("./middlewares/routeNotFound");
require("dotenv").config();
const app = express();
CreateDatabaseConnection();
app.get("/", (req, res) => {
  res.json({ status: true, message: "backend of chalk acessed successfully" });
});
app.use(routeNotFound);
app.use(errorHandler);
app.listen(9000, () => console.log("app up and running"));
