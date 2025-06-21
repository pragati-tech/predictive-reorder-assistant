const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  currentStock: Number,
  averageDailyUsage: Number,
  leadTimeDays: Number,
  safetyStock: Number,
  reorderLevel: Number,
  lastReorderDate: Date
});

module.exports = mongoose.model('Item', itemSchema);
    