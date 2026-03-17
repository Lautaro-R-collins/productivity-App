import React from 'react';
import { FiHome, FiCheckSquare, FiCalendar, FiSettings, FiBriefcase } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-950 text-slate-300 h-screen flex flex-col p-4 border-r border-slate-800">
      <div className="mb-8 font-bold text-xl text-white flex items-center gap-2 px-2">
        <FiBriefcase className="w-6 h-6 text-blue-500" />
        Productivity App
      </div>
      <nav className="flex-1 space-y-2">
        <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-slate-800 transition text-slate-300 hover:text-white">
          <FiHome className="w-5 h-5" />
          Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-slate-800 transition text-slate-300 hover:text-white">
          <FiCheckSquare className="w-5 h-5" />
          Tasks
        </a>
        <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-slate-800 transition text-slate-300 hover:text-white">
          <FiCalendar className="w-5 h-5" />
          Calendar
        </a>
      </nav>
      <div className="mt-auto">
        <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-slate-800 transition text-slate-300 hover:text-white">
          <FiSettings className="w-5 h-5" />
          Settings
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
