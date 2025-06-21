import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
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

function UsageChart({ itemId }) {
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/items/${itemId}/usage-logs`).then(res => {
      const grouped = {};
      res.data.forEach(entry => {
        const date = new Date(entry.date).toLocaleDateString();
        grouped[date] = (grouped[date] || 0) + entry.usedQuantity;
      });
      const labels = Object.keys(grouped);
      const data = Object.values(grouped);
      setDataSet({ labels, data });
    });
  }, [itemId]);

  const chartData = {
    labels: dataSet.labels,
    datasets: [
      {
        label: 'Daily Usage',
        data: dataSet.data,
        borderColor: 'blue',
        fill: false,
        tension: 0.3
      }
    ]
  };

  return <Line data={chartData} />;
}

export default UsageChart;