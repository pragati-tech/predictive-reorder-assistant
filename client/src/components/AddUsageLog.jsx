import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 🧭 Add useNavigate
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// Log Usage Page
export default function AddUsageLog() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate(); // 🧭 Initialize navigate

  useEffect(() => {
    axios.get('http://localhost:5000/api/items/list')
      .then(res => setItems(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId || !quantity || quantity <= 0) {
      toast.error('Please select an item and enter valid quantity');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/items/${selectedId}/usage`, {
        usedQuantity: Number(quantity)
      });
      toast.success('Usage logged successfully');
      setQuantity('');

      // 🧭 Redirect to Dashboard after a short delay
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      toast.error('Failed to log usage');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Toaster />
      <Link to="/" className="inline-block mb-4 text-sm text-blue-400 hover:underline">← Back to Dashboard</Link>
      <h2 className="text-2xl font-bold mb-4 text-white">Log Item Usage</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg">
        <div>
          <label className="block text-sm font-semibold mb-1 text-white">Select Item</label>
          <select value={selectedId} onChange={e => setSelectedId(e.target.value)} className="w-full p-2 bg-gray-700 text-white rounded" required>
            <option value="">-- Select Item --</option>
            {items.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-white">Used Quantity</label>
          <input
            type="number"
            placeholder="e.g., 10"
            className="w-full p-2 bg-gray-700 text-white rounded"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            required
            min={1}
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Log Usage</button>
      </form>
    </div>
  );
}
