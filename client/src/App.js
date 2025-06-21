import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddItemForm from './components/AddItemForm';
import AddUsageLog from './components/AddUsageLog';
import Inventory from './components/Inventory';
import Navbar from './components/Navbar';
import Predictions from './components/Predictions';
import Nav from './components/Nav';
import './index.css';

function App() {
  return (
    <Router>

      <div className="bg-gray-900 text-white min-h-screen p-4">
        <Nav/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-item" element={<AddItemForm />} />
          <Route path="/log-usage" element={<AddUsageLog />} />
          <Route path="/inventory" element={<Inventory/>} />
          <Route path="/predictions" element={<Predictions/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;