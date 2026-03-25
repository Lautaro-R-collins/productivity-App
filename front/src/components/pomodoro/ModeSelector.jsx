import React from 'react';
import { FiClock, FiCoffee } from 'react-icons/fi';
import { usePomodoro } from '../../context/PomodoroContext';

const ModeSelector = () => {
  const { currentMode, changeMode, MODES } = usePomodoro();

  return (
    <div className="flex gap-2 sm:gap-4 mb-12 bg-slate-900 p-2 rounded-2xl w-full max-w-lg justify-center shadow-inner overflow-x-auto">
      {Object.keys(MODES).map((key) => {
        const mode = MODES[key];
        const isSelected = currentMode.id === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => changeMode(key)}
            className={`flex items-center gap-2 px-4 py-3 sm:px-6 rounded-xl font-medium transition-all cursor-pointer ${
              isSelected 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {mode.id === 'pomodoro' ? <FiClock className="w-5 h-5" /> : <FiCoffee className="w-5 h-5" />}
            <span className="hidden sm:block">{mode.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ModeSelector;
