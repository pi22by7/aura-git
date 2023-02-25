// Imports
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// TODO: Must use `https` later
const http = require("http");
// const bodyParser = require("body-parser");

// Constants
const expressApp = express();
const httpApp = http.createServer(expressApp);
const { PORT } = process.env;

// Body
// expressApp.use(bodyParser.json())
expressApp.use(express.json());
expressApp.use(cors());
expressApp.use(cookieParser());

httpApp.listen(PORT, () => console.log("[express.util] Express server running on port", PORT));

module.exports = {
  expressApp,
  httpApp,
};
