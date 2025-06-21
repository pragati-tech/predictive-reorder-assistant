const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/items');

const app = express();

app.use(cors());
app.use(express.json());  // ← VERY IMPORTANT

mongoose.connect('mongodb://localhost:27017/inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/items', itemRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
