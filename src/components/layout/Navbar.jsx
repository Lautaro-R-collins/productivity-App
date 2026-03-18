import React from 'react';
import { FiSearch, FiBell, FiMail, FiUser } from 'react-icons/fi';

const Navbar = () => {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-end px-6 text-slate-300">
      <div className="flex items-center space-x-6">
        <button className="text-slate-400 cursor-pointer hover:text-white transition relative">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </button>
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white cursor-pointer hover:bg-slate-600 transition">
          <FiUser className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
