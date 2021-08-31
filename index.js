const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ status: true, message: "backend of chalk acessed successfully" });
});
app.listen(9000, () => console.log("app up and running"));
