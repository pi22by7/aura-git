// Start log
const { logInfo } = require("./utils/winston.util");
logInfo("[START]");

// Load and cache all Environment variables
require("dotenv").config();

// Connect to MongoDB
require("./scripts/mongodb.script");

// Start Express server
const { expressApp } = require("./utils/express.util");

// Middlewares and Routes
const { checkUser } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const teamRoutes = require("./routes/teamRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const submissionRoutes = require("./routes/submissionRoutes");

// Route Middlewares
expressApp.get("*", checkUser);
expressApp.use("/auth/user", authRoutes);
expressApp.use("/users", userRoutes);
expressApp.use("/events", eventRoutes);
expressApp.use("/teams", teamRoutes);
expressApp.use("/tickets", ticketRoutes);
expressApp.use("/payments", paymentRoutes);
expressApp.use("/submissions", submissionRoutes);
