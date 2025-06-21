const mongoose = require('mongoose');
const UsageLog = require('../models/UsageLog'); // adjust path as needed

async function calculateAverageDailyUsage(itemId, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const usageLogs = await UsageLog.aggregate([
    {
      $match: {
        itemId: new mongoose.Types.ObjectId(itemId),
        date: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        totalUsed: { $sum: "$usedQuantity" }
      }
    }
  ]);

  const totalDays = usageLogs.length || 1;
  const totalUsage = usageLogs.reduce((sum, log) => sum + log.totalUsed, 0);

  return totalUsage / totalDays;
}

module.exports = { calculateAverageDailyUsage };
    