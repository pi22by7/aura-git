// Imports
const mongoose = require("mongoose");

// Constants
const { DB_URI } = process.env;

// Body
mongoose.connection.on("connected", () => console.log("[mongodb.script]", "Connected to database"));
mongoose.connection.on("disconnected", () => console.log("[mongodb.script]", "Disconnected from database"));
mongoose.connection.on("error", console.error);

// Fix deprecation warnings
mongoose.set("strictQuery", true);

mongoose.connect(DB_URI);
