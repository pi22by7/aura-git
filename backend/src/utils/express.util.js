// Imports
const express = require("express");
const cors = require("cors");

// Constants
const { PORT } = process.env;
const app = express();

// Body
app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log("[express.util]", "Express server running on port", PORT));

module.exports = app;
