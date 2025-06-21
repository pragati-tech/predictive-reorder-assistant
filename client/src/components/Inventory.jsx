import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import Navbar from './Navbar';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/items/list')
      .then(res => setItems(res.data));
  }, []);

  const filteredItems = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
        <Navbar/>
      <h2 className="text-3xl font-bold text-white mb-6">Inventory Management</h2>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search items..."
          className="px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg w-64"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full table-auto bg-white text-gray-900">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-6 py-3 font-semibold">Item Name</th>
              <th className="px-6 py-3 font-semibold">Current Stock</th>
              <th className="px-6 py-3 font-semibold">Daily Usage</th>
              <th className="px-6 py-3 font-semibold">Days Left</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(i => {
              const daysLeft = Math.floor(i.currentStock / (i.averageUsage || 1));
              let statusColor = 'bg-green-600';
              let statusLabel = 'good';

              if (daysLeft <= 3) {
                statusColor = 'bg-red-600';
                statusLabel = 'critical';
              } else if (daysLeft <= 7) {
                statusColor = 'bg-orange-500';
                statusLabel = 'warning';
              }

              return (
                <tr key={i._id} className="border-t hover:bg-gray-100 transition">
                  <td className="px-6 py-4">{i.name}</td>
                  <td className="px-6 py-4">{i.currentStock}</td>
                  {/* <td className="px-6 py-4">{i.reorderLevel} / {i.maxStock || '—'}</td> */}
                  <td className="px-6 py-4">{i.averageUsage}</td>
                  <td className="px-6 py-4">{daysLeft} days</td>    
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${statusColor}`}>{statusLabel}</span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
                      <Pencil size={16} />
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
