const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const proposalRoutes = require("./routes/proposalRoutes");
const contractRoutes = require("./routes/contractRoutes");
const solanaRoutes = require("./routes/solanaRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
 
// Health and metrics routes
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: "lancelot-backend"
  });
});

app.get("/metrics", (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.status(200).json({
    uptime_seconds: process.uptime(),
    memory_heap_used_bytes: memoryUsage.heapUsed,
    memory_heap_total_bytes: memoryUsage.heapTotal,
    memory_rss_bytes: memoryUsage.rss,
    status_code: 200
  });
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/proposals", proposalRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/solana", solanaRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;