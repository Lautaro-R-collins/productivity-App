import React from 'react';
import { FiPlay, FiPause, FiRefreshCw } from 'react-icons/fi';
import { usePomodoro } from '../../context/PomodoroContext';

const Controls = () => {
  const { isActive, toggleTimer, resetTimer } = usePomodoro();

  return (
    <div className="flex items-center gap-6">
      <button 
        onClick={toggleTimer}
        className={`w-16 h-16 cursor-pointer flex items-center justify-center rounded-4xl text-white shadow-xl transition-all hover:scale-105 active:scale-95 ${
          isActive 
            ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/30' 
            : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30'
        }`}
      >
        {isActive ? <FiPause className="w-8 h-8" fill="currentColor" /> : <FiPlay className="w-8 h-8 ml-2" fill="currentColor" />}
      </button>
      
      <button 
        onClick={resetTimer}
        className="w-16 h-16 cursor-pointer flex items-center justify-center rounded-2xl bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-500"
        title="Reiniciar"
      >
        <FiRefreshCw className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Controls;
