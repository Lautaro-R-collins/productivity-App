import React from 'react';
import { usePomodoro } from '../../context/PomodoroContext';

const TimerDisplay = () => {
  const { settings, currentMode, timeLeft } = usePomodoro();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds = settings[currentMode.id] * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  return (
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
  );
};

export default TimerDisplay;
