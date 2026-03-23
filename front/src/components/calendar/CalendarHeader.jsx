import React from 'react';
import { FiCalendar, FiPlus } from 'react-icons/fi';

const CalendarHeader = ({ onAddEvent }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <FiCalendar className="w-8 h-8 text-indigo-500" />
        <h1 className="text-2xl font-bold text-white">Calendar</h1>
      </div>
      <button 
        onClick={onAddEvent}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition shadow-md"
      >
        <FiPlus /> Nuevo Recordatorio
      </button>
    </div>
  );
};

export default CalendarHeader;
