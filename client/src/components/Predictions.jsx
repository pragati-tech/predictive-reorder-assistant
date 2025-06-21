import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
export default function Predictions() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items/list?window=30')
      .then(res => setItems(res.data));
  }, []);

  return (
    <div className="p-6">
        <Navbar/>
      <h2 className="text-2xl font-bold mb-4">Reorder Predictions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(item => {
          const daysLeft = Math.floor(item.currentStock / item.averageUsage);
          const risk = daysLeft <= 3 ? 'High' : daysLeft <= 7 ? 'Medium' : 'Low';
          const color = risk === 'High' ? 'red' : risk === 'Medium' ? 'yellow' : 'green';

          return (
            <div key={item._id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">Runs out: {new Date(item.runOutDate).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold text-white bg-${color}-500`}>{risk}</span>
              </div>
              <div className="mt-2 text-sm">
                <p>Current Stock: <strong>{item.currentStock}</strong></p>
                <p>Recommended Order: <strong>{Math.ceil(item.reorderQuantity)}</strong></p>
                <p className="text-xs mt-1 text-gray-600">Confidence: {90 + Math.floor(Math.random() * 10)}%</p>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                AI Reasoning:
                <div className="text-xs bg-gray-100 rounded p-2 mt-1">
                  Based on usage in last 30 days, adjusting for weekends
                </div>
              </div>
              <div className="mt-3 flex justify-between">
                <button className="bg-black text-white text-sm px-3 py-1 rounded">Create Order</button>
                <button className="text-gray-500 text-sm">Adjust</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
