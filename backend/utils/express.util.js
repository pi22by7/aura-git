// Imports
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const serveStatic = require("serve-static");
const meta = require("../configs/meta.json");

// const http = require("http");
const https = require("https"); // TODO: Uncomment when we get certificate

// Constants
const options = { // TODO: Uncomment when we get certificate
  cert: fs.readFileSync(path.join(__dirname, "..", "cert.pem")),
  key: fs.readFileSync(path.join(__dirname, "..", "key.pem")),
};

const serve = serveStatic("../build2/", { index: ["index.html"] });

const expressApp = express();
const httpsApp = https.createServer(options, expressApp); // TODO: Uncomment when we get certificate
// const httpApp = http.createServer(expressApp);
const { PORT } = process.env;

// Body
expressApp.use(express.json());
expressApp.use(
  cors({
    origin: [
      meta.host,
      meta.dashboard_host,
    ],
    credentials: true,
  })
);
expressApp.use(cookieParser());

httpsApp.listen(PORT, () => console.log("[express.util] Express server running on port", PORT)); // TODO: Uncomment when we get certificate
// httpApp.listen(PORT, () => console.log("[express.util] Express server running on port", PORT));

// Serve front-end
expressApp.use("/", serve);

module.exports = {
  expressApp,
  httpsApp, // TODO: Uncomment when we get certificate
  // httpApp,
};
