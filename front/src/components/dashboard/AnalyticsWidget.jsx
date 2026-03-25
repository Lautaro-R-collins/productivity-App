import React from 'react';
import { FiActivity } from 'react-icons/fi';

const AnalyticsWidget = ({ tasks }) => {
  const completedTasksCount = tasks.filter(t => t.completed).length;

  return (
    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl hover:shadow-emerald-500/10 transition-shadow flex flex-col group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-emerald-500/10 rounded-2xl group-hover:bg-emerald-500/20 transition-colors">
             <FiActivity className="w-8 h-8 text-emerald-400" />
           </div>
           <div>
             <h3 className="text-xl font-bold text-white">Productividad</h3>
             <p className="text-sm text-slate-400">Progreso de Tareas</p>
           </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 absolute inset-0">
            <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-700/50" />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={56 * 2 * Math.PI}
              strokeDashoffset={
                tasks.length === 0 
                  ? 56 * 2 * Math.PI 
                  : (56 * 2 * Math.PI) - ((completedTasksCount / tasks.length) * (56 * 2 * Math.PI))
              }
              strokeLinecap="round"
              className="text-emerald-400 transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="text-center z-10 flex flex-col items-center">
            <span className="text-2xl font-black text-white leading-none">
              {tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0}%
            </span>
            <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold mt-1">Ready</span>
          </div>
        </div>
        
        <div className="mt-8 text-center space-y-1">
          <p className="text-slate-300 font-medium">
            Has completado <span className="text-emerald-400 font-bold text-lg">{completedTasksCount}</span> tareas.
          </p>
          <p className="text-slate-500 text-sm">
            Sigue así y alcanza tus metas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;
