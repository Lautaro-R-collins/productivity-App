import React from 'react';
import { FiPlay, FiPause, FiRefreshCw, FiClock, FiCoffee } from 'react-icons/fi';
import { usePomodoro } from '../context/PomodoroContext';

const Pomodoro = () => {
  const { 
    settings, 
    currentMode, 
    timeLeft, 
    isActive, 
    toggleTimer, 
    resetTimer, 
    changeMode,
    MODES 
  } = usePomodoro();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds = settings[currentMode.id] * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  return (
    <main className="flex-1 min-h-screen overflow-auto bg-slate-900 p-6 text-slate-300 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700 p-10 flex flex-col items-center">
        
        {/* Selector de Modo */}
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

        <div className="relative w-80 h-80 flex items-center justify-center mb-12 drop-shadow-2xl">
          <svg className="w-full h-full transform -rotate-90 absolute inset-0">
            <circle cx="160" cy="160" r="145" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-700/50" />
            <circle cx="160" cy="160" r="145" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-700" />
            <circle
              cx="160"
              cy="160"
              r="145"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={145 * 2 * Math.PI}
              strokeDashoffset={145 * 2 * Math.PI - (progress / 100) * 145 * 2 * Math.PI}
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-linear ${
                currentMode.id === 'pomodoro' ? 'text-indigo-500' : 'text-emerald-500'
              }`}
            />
          </svg>
          <div className="flex flex-col items-center z-10">
            <span className="text-6xl font-black text-white tracking-widest tabular-nums leading-none">
              {formatTime(timeLeft)}
            </span>
            <span className="text-slate-400 mt-4 font-bold uppercase tracking-[0.3em] text-sm">
              {currentMode.name}
            </span>
          </div>
        </div>

        {/* Controles del Temporizador */}
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

      </div>
    </main>
  );
};

export default Pomodoro;
