const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const UsageLog = require('../models/UsageLog');
const { calculateAverageDailyUsage } = require('../utils/usageUtils');

router.use(express.json());

router.post('/add', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.json({ message: 'Item added', item });
  } catch (err) {
    console.error('Save error:', err.message);
    res.status(500).json({ error: 'Failed to save item', details: err.message });
  }
});

router.post('/:id/usage', async (req, res) => {
  try {
    const { usedQuantity } = req.body;

    const usageLog = new UsageLog({ itemId: req.params.id, usedQuantity });
    await usageLog.save();

    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    item.currentStock -= usedQuantity;
    item.averageDailyUsage = await calculateAverageDailyUsage(req.params.id);
    await item.save();

    res.json({ message: 'Usage logged and average usage updated' });
  } catch (err) {
    console.error('Usage log error:', err.message);
    res.status(500).json({ error: 'Failed to log usage', details: err.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const items = await Item.find();
    const today = new Date();
    const windowDays = parseInt(req.query.window) || 14;
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - windowDays);

    const result = await Promise.all(items.map(async (item) => {
      // Recalculate avg usage using utility
      let avgUsage = await calculateAverageDailyUsage(item._id, windowDays);
      if (isNaN(avgUsage) || avgUsage <= 0) avgUsage = 0.01;

      const daysLeft = Math.floor(item.currentStock / avgUsage);
      const runOutDate = new Date(today);
      runOutDate.setDate(today.getDate() + daysLeft);

      const reorderQuantity = Math.ceil((avgUsage * item.leadTimeDays) + item.safetyStock);

      return {
        ...item._doc,
        averageUsage: avgUsage.toFixed(2),
        runOutDate,
        reorderQuantity
      };
    }));

    res.json(result);
  } catch (err) {
    console.error('Error in /list:', err.message);
    res.status(500).json({ error: 'Failed to fetch inventory list' });
  }
});



module.exports = router;
