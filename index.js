const express = require("express");
const cors = require("cors");
const { CreateDatabaseConnection } = require("./db/dbConnection");
const { errorHandler } = require("./middlewares/errorHandler");
const { routeNotFound } = require("./middlewares/routeNotFound");
const { userRoute } = require("./routes/user-routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
CreateDatabaseConnection();
app.get("/", (req, res) => {
  res.json({ status: true, message: "backend of chalk acessed successfully" });
});

app.use("/user", userRoute);
app.use(routeNotFound);
app.use(errorHandler);
app.listen(9000 || process.env.PORT, () => console.log("app up and running"));
