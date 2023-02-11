// Imports
const mongoose = require("mongoose");

// Constants
const { DB } = process.env;

// Body
mongoose.set("strictQuery", false);

mongoose.connection.on("connected", () => console.log("[mongodb.script]", "MongoDB Connected"));
mongoose.connection.on("disconnected", () => console.log("[mongodb.script]", "MongoDB Disconnected"));
mongoose.connection.on("error", console.error);

mongoose.connect(DB, {
  useNewUrlParser: true,
});
