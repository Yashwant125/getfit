const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env variables from .env file
dotenv.config();

// Route imports
const memberRoutes = require('./routes/memberRoutes');
const planRoutes = require('./routes/planRoutes');
const profileRoutes = require('./routes/profileRoutes'); // Profile route added

// MongoDB URI check
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI not defined in .env file');
  process.exit(1);
}

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/members', memberRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/profile', profileRoutes); // Gym profile route

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
