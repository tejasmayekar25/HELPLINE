require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Basic health check routes
app.get("/", (req, res) => {
  res.send("Disaster Management API is running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API working successfully" });
});

// Mount Complaints REST API
app.use("/api/complaints", complaintRoutes);

// MongoDB Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/DisasterManagement";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully: DisasterManagement");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.log("Starting server without MongoDB connection (fallback mode)...");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (MongoDB offline)`);
    });
  });
