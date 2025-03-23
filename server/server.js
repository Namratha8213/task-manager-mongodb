const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());
app.use(cors());
app.use("/api", taskRoutes);
app.use(express.static("public"));  // Serve frontend files

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const cors = require("cors");
app.use(cors());
