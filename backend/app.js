// Setup
require("dotenv").config();

// Connect to Database
require("./src/scripts/mongodb.script");

// Start express server
const expressApp = require("./src/utils/express.util");
