import React from 'react';
import { FiSun } from 'react-icons/fi';

const TaskHeader = () => {
  const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="mb-8 pl-4">
      <h1 className="text-4xl font-bold text-white flex items-center gap-3 tracking-tight">
        <FiSun className="text-indigo-400" /> Mi Día
      </h1>
      <p className="text-slate-400 mt-2 text-lg capitalize font-medium opacity-80">{today}</p>
    </div>
  );
};

export default TaskHeader;
