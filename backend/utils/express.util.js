// Imports
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const meta = require("../configs/meta.json");

// TODO: Must use `https` later
const http = require("http");

// Constants
const expressApp = express();
const httpApp = http.createServer(expressApp);
const { PORT } = process.env;

// Body
expressApp.use(express.json());
expressApp.use(
  // cors({
  //   origin: meta.dev_host,
  //   credentials: true,
  // })
  cors(),
);
expressApp.use(cookieParser());

httpApp.listen(PORT, () => console.log("[express.util] Express server running on port", PORT));

module.exports = {
  expressApp,
  httpApp,
};
