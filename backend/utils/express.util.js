// Imports
const express = require("express");
const cookieParser = require("cookie-parser");

// TODO: Must use `https` later
const http = require("http");

// Constants
const expressApp = express();
const httpApp = http.createServer(expressApp);
const { PORT } = process.env;

// Body
expressApp.use(express.json());
expressApp.use(cookieParser());

httpApp.listen(PORT, () => console.log("[express.util] Express server running on port", PORT));

module.exports = {
  expressApp,
  httpApp,
};
