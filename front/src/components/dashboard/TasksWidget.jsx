import React from 'react';
import { FiList, FiChevronRight, FiCheckCircle, FiCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const TasksWidget = ({ tasks }) => {
  const pendingTasks = tasks.filter(t => !t.completed);
  const topTasks = pendingTasks.slice(0, 3);

  return (
    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl hover:shadow-indigo-500/10 transition-shadow flex flex-col group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 rounded-2xl group-hover:bg-indigo-500/20 transition-colors">
            <FiList className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Tareas</h3>
            <p className="text-sm text-slate-400">{pendingTasks.length} pendientes</p>
          </div>
        </div>
        <Link to="/tasks" className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-slate-700/50 rounded-xl transition-all outline-none">
          <FiChevronRight className="w-6 h-6" />
        </Link>
      </div>
      
      <div className="flex-1 space-y-3 mb-6">
        {topTasks.length > 0 ? (
          topTasks.map(task => (
            <div key={task._id} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <FiCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <span className="text-slate-300 truncate">{task.title}</span>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-slate-500 h-full">
            <FiCheckCircle className="w-8 h-8 mb-2 opacity-50" />
            <p className="font-medium text-slate-400">¡Todo al día!</p>
          </div>
        )}
        {pendingTasks.length > 3 && (
          <p className="text-xs text-center text-slate-500 pt-2 font-medium">
            + {pendingTasks.length - 3} tareas más en la lista
          </p>
        )}
      </div>
      
      <div className="pt-4 border-t border-slate-700/80">
        <Link to="/tasks" className="text-indigo-400 text-sm font-semibold hover:text-indigo-300 w-full text-center block transition-colors outline-none">
          Ir a mis Tareas
        </Link>
      </div>
    </div>
  );
};

export default TasksWidget;
