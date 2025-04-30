const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    membershipType: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['paid', 'unpaid', 'partially paid'],
      required: true,
    },
    amountPaid: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);
