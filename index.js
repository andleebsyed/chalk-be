const express = require("express");
const { errorHandler } = require("./middlewares/errorHandler");
const { routeNotFound } = require("./middlewares/routeNotFound");
const app = express();

app.get("/", (req, res) => {
  res.json({ status: true, message: "backend of chalk acessed successfully" });
});
app.use(routeNotFound);
app.use(errorHandler);
app.listen(9000, () => console.log("app up and running"));
