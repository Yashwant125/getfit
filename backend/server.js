const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const invoiceRoutes = require('./routes/invoiceRoutes');

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
app.use('/api/invoice', invoiceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
