import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiCheckSquare, FiCalendar, FiSettings, FiBriefcase, FiClock, FiMessageSquare, FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded transition ${
      isActive
        ? 'bg-slate-800 text-white'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 h-screen flex flex-col p-4 border-r border-slate-800">
      <div className="mb-8 font-bold text-xl text-white flex items-center gap-2 px-2">
        <FiBriefcase className="w-6 h-6 text-blue-500" />
        Productivity App
      </div>
      <nav className="flex-1 space-y-2">
        <NavLink to="/dashboard" className={navLinkClass}>
          <FiHome className="w-5 h-5" />
          Dashboard
        </NavLink>
        <NavLink to="/tasks" className={navLinkClass}>
          <FiCheckSquare className="w-5 h-5" />
          Tasks
        </NavLink>
        <NavLink to="/calendar" className={navLinkClass}>
          <FiCalendar className="w-5 h-5" />
          Calendar
        </NavLink>
        <NavLink to="/pomodoro" className={navLinkClass}>
          <FiClock className="w-5 h-5" />
          Pomodoro
        </NavLink>
        <NavLink to="/assistant" className={navLinkClass}>
          <FiMessageSquare className="w-5 h-5" />
          Asistente AI
        </NavLink>
      </nav>
      <div className="mt-auto flex flex-col gap-2">
        <NavLink to="/settings" className={navLinkClass}>
          <FiSettings className="w-5 h-5" />
          Settings
        </NavLink>
        <button 
          onClick={logout}
          className="flex cursor-pointer items-center gap-3 p-2 rounded transition text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 w-full text-left"
        >
          <FiLogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
