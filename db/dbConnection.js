const mongoose = require("mongoose");
async function CreateDatabaseConnection() {
  try {
    await mongoose.connect(process.env.URI);
    console.log("connection to database created successsfully");
  } catch (error) {
    console.log("database connection failed ", error?.message);
  }
}

module.exports = { CreateDatabaseConnection };
