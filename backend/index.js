// Load and cache all Environment variables
require("dotenv").config();

// Connect to MongoDB
require("./scripts/mongodb.script");

// Start Express server
const { expressApp } = require("./utils/express.util");

// Middlewares and Routes
const { checkUser } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");

// Route Middlewares
expressApp.get("*", checkUser);
expressApp.use("/auth/user", authRoutes);
expressApp.use(authRoutes);
