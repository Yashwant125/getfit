const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: String,
});

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  contact: String,
  sessionTimings: {
    morning: String,
    evening: String,
  },
  trainers: {
    morning: [trainerSchema],
    evening: [trainerSchema],
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
