    import React from 'react';
    import { NavLink } from 'react-router-dom';
    import { CalendarDays, Package, LineChart } from 'lucide-react';

    export default function Navbar() {
    return (
        <div className="flex justify-center items-center">
        <div className="flex space-x-4 rounded-lg bg-white">
            <NavLink
            to="/dashboard"
            className={({ isActive }) =>        
                `flex items-center gap-1 px-4 py-2 rounded transition-colors duration-200 ${
                isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`
            }
            >
            <LineChart className="h-4 w-4" />
            <span>Dashboard</span>
            </NavLink>

            <NavLink
            to="/inventory"
            className={({ isActive }) =>
                `flex items-center gap-1 px-4 py-2 rounded transition-colors duration-200 ${
                isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`
            }
            >
            <Package className="h-4 w-4" />
            <span>Inventory</span>
            </NavLink>

            <NavLink
            to="/predictions"
            className={({ isActive }) =>
                `flex items-center gap-1 px-4 py-2 rounded transition-colors duration-200 ${
                isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`
            }
            >
            <CalendarDays className="h-4 w-4" />
            <span>Predictions</span>
            </NavLink>
        </div>
        </div>
    );
    }
