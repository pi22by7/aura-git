// Load and cache all Environment variables
require("dotenv").config();

// Connect to MongoDB
require("./scripts/mongodb.script");

// Start Express server
const { expressApp } = require("./utils/express.util");

// Middlewares and Routes
const { checkUser } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const teamRoutes = require("./routes/teamRoutes");

// Route Middlewares
expressApp.get("*", checkUser);
expressApp.use("/auth/user", authRoutes);
expressApp.use("/event", eventRoutes);
expressApp.use("/teams", teamRoutes);
// expressApp.use(authRoutes);
expressApp.use("/tickets", ticketRoutes);
