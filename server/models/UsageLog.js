const mongoose = require('mongoose');

const usageLogSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  usedQuantity: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UsageLog', usageLogSchema);
  