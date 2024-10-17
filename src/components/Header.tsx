import React from 'react';
import { Link } from 'react-router-dom';
import { Home, List, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">Habit Tracker</Link>
        <div className="flex space-x-4">
          <Link to="/" className="flex items-center text-gray-600 hover:text-indigo-600">
            <Home className="w-5 h-5 mr-1" />
            <span>Dashboard</span>
          </Link>
          <Link to="/habits" className="flex items-center text-gray-600 hover:text-indigo-600">
            <List className="w-5 h-5 mr-1" />
            <span>Habits</span>
          </Link>
          <Link to="/profile" className="flex items-center text-gray-600 hover:text-indigo-600">
            <User className="w-5 h-5 mr-1" />
            <span>Profile</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;