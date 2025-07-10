const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/plans", require("./routes/planRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/auth", require("./routes/authRoutes")); // 👈 Auth

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
