const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
const allowedOrigins = [
    "https://task-manager-mongodb-54c77hijd-namratha-s-projects-0821a31d.vercel.app",
    "http://localhost:3000", // For local development
    "https://task-manager-using-mongodb.vercel.app/",
  ];
  
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );
  const cors = require('cors');

app.use("/api", taskRoutes);
app.use(express.static("public"));  // Serve frontend files

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

