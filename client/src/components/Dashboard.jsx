import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Line } from 'react-chartjs-2';
import Navbar from './Navbar';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [windowDays, setWindowDays] = useState(14);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/items/list?window=${windowDays}`)
      .then(res => {
        setItems(res.data);

        // Prepare chart data
        const labels = res.data.map(i => i.name);
        const data = res.data.map(i => i.currentStock);
        setChartData({
          labels,
          datasets: [{
            label: 'Current Stock',
            data,
            borderColor: 'cyan',
            backgroundColor: 'rgba(0,255,255,0.1)',
            fill: true,
            tension: 0.3
          }]
        });
      })
      .catch(err => toast.error('Failed to fetch items'));
  }, [windowDays]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Navbar/>
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Inventory Dashboard</h2>
        <select onChange={e => setWindowDays(e.target.value)} value={windowDays} className="bg-gray-700 text-white px-3 py-2 rounded">
          <option value="7">Last 7 Days</option>
          <option value="14">Last 14 Days</option>
          <option value="30">Last 30 Days</option>
        </select>
      </div>
        <div className="overflow-x-auto bg-gray-800 rounded-lg">
        <table className="min-w-full table-auto text-white">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Avg Usage</th>
              <th className="px-4 py-2 text-left">Run-Out Date</th>
              <th className="px-4 py-2 text-left">Reorder Qty</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">No items found</td>
              </tr>
            ) : (
              items.map(i => (
                <tr key={i._id} className={i.currentStock < i.reorderLevel ? 'bg-red-900' : 'hover:bg-gray-700'}>
                  <td className="px-4 py-2">{i.name}</td>
                  <td className="px-4 py-2">{i.currentStock}</td>
                  <td className="px-4 py-2">{i.averageUsage || '0.00'}</td>
                  <td className="px-4 py-2">{i.runOutDate ? new Date(i.runOutDate).toDateString() : '-'}</td>
                  <td className="px-4 py-2">{i.reorderQuantity || 0}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10   ">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 text-white">Stock Level Trends</h3>
          <Line data={chartData} className="bg-white rounded" />
        </div>

        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">Critical Stock Alerts</h3>
          {items.filter(i => i.currentStock < i.reorderLevel).length === 0 ? (
            <p className="text-gray-700 dark:text-white">No critical items</p>
          ) : (
            <ul className="space-y-2">
              {items.filter(i => i.currentStock < i.reorderLevel).map(i => (
                <li key={i._id} className="flex justify-between items-center bg-red-200 dark:bg-red-800 px-3 py-2 rounded">
                  <span className="text-red-800 dark:text-white font-medium">{i.name} - Only {Math.ceil(i.currentStock)} left</span>
                  <Link to="/inventory" className="bg-red-700 text-white px-2 py-1 text-sm rounded">Reorder</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

  
    </div>
  );
}
