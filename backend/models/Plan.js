const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  membershipType: {
    type: String,
    enum: ['Silver', 'Gold', 'Platinum', 'Diamond'],
    required: true
  },
  duration: {
    type: String,
    enum: ['1 Month', '3 Months', '6 Months', '12 Months'],
    required: true
  },
  amount: {
    type: Number,
    enum: [1000, 2000, 4000, 8000],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);
