import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AddItemForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    currentStock: '',
    leadTimeDays: '',
    safetyStock: '',
    reorderLevel: '',
    lastReorderDate: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/items/add', form);
      toast.success('Item added successfully');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toaster />
      <Link to="/" className="inline-block mb-4 text-sm text-blue-400 hover:underline">
        ← Back to Dashboard
      </Link>
      <h2 className="text-3xl font-bold mb-1 text-white">Add New Item</h2>
      <p className="mb-6 text-gray-300">Fill out the form to add a new inventory item.</p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg"
      >
        <div>
          <label className="block text-sm font-semibold mb-1 text-white">Item Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="e.g., Office Paper"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-white">Current Stock *</label>
          <input
            type="number"
            name="currentStock"
            value={form.currentStock}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="e.g., 100"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-white">Lead Time (days) *</label>
          <input
            type="number"
            name="leadTimeDays"
            value={form.leadTimeDays}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="e.g., 7"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-white">Safety Stock *</label>
          <input
            type="number"
            name="safetyStock"
            value={form.safetyStock}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="e.g., 20"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-white">Reorder Level *</label>
          <input
            type="number"
            name="reorderLevel"
            value={form.reorderLevel}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="e.g., 30"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1 text-white">Last Reorder Date</label>
          <input
            type="date"
            name="lastReorderDate"
            value={form.lastReorderDate}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="md:col-span-2 text-right mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}
