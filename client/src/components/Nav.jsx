import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Predictive Reorder Assistant</div>

      <div className="space-x-6 text-sm font-medium">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-400 underline'
              : 'hover:text-blue-400 transition-colors duration-200'
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/add-item"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-400 underline'
              : 'hover:text-blue-400 transition-colors duration-200'
          }
        >
          Add Item
        </NavLink>

        <NavLink
          to="/log-usage"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-400 underline'
              : 'hover:text-blue-400 transition-colors duration-200'
          }
        >
          Log Usage
        </NavLink>
      </div>
    </nav>
  );
}
