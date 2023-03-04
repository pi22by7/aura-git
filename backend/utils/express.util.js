// Imports
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const meta = require("../configs/meta.json");

// TODO: Must use `https` later
const http = require("http");
const https = require("https");

// Constants
const options = {
  cert: fs.readFileSync(path.join(__dirname, "..", "cert.pem")),
  key: fs.readFileSync(path.join(__dirname, "..", "key.pem")),
};

const expressApp = express();
const httpsApp = https.createServer(options, expressApp);
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

// httpApp.listen(PORT, () => console.log("[express.util] Express server running on port", PORT));
httpsApp.listen(PORT, () => console.log("[express.util] Express server running on port", PORT));

module.exports = {
  expressApp,
  httpsApp,
};
