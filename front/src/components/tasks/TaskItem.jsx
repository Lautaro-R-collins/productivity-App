import React from 'react';
import { FiCircle, FiCheckCircle, FiStar, FiTrash2 } from 'react-icons/fi';

const TaskItem = ({ task, onToggleStatus, onToggleImportant, onDelete, provided, snapshot }) => {
  const isCompleted = task.completed;

  const dragProps = provided ? {
    ref: provided.innerRef,
    ...provided.draggableProps,
    ...provided.dragHandleProps,
  } : {};

  const dragStyles = snapshot && snapshot.isDragging 
    ? 'shadow-2xl shadow-indigo-500/20 scale-[1.02] border-indigo-500/50 z-50 cursor-grabbing'
    : 'shadow-md hover:shadow-lg cursor-grab active:cursor-grabbing';

  const completedStyles = isCompleted 
    ? 'bg-slate-800/40 hover:bg-slate-800/60 cursor-pointer' 
    : 'bg-slate-800 hover:bg-slate-700/80 cursor-grab active:cursor-grabbing';

  // Merge the styles intelligently
  const combinedClasses = `group flex items-center justify-between p-4 rounded-xl transition-colors border border-transparent ${completedStyles} ${provided ? dragStyles : ''}`;

  return (
    <div {...dragProps} className={combinedClasses}>
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => onToggleStatus(task)}
          className={`${isCompleted ? 'text-indigo-500 hover:text-indigo-400' : 'text-slate-400 hover:text-indigo-400'} transition-colors focus:outline-none shrink-0 cursor-pointer p-1`}
          title={isCompleted ? "Desmarcar" : "Marcar completada"}
        >
          {isCompleted ? <FiCheckCircle className="w-6 h-6 cursor-pointer" /> : <FiCircle className="w-6 h-6 cursor-pointer" />}
        </button>
        <span 
          className={`text-slate-500 text-lg transition-all cursor-text select-text ${isCompleted ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}`}
        >
          {task.title}
        </span>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onDelete(task._id)}
          className="p-2.5 text-slate-500 hover:text-rose-400 hover:bg-slate-700/80 rounded-lg transition-colors focus:outline-none cursor-pointer"
          title="Eliminar tarea"
        >
          <FiTrash2 className="w-5 h-5 cursor-pointer" />
        </button>
        <button 
          onClick={() => onToggleImportant(task)}
          className={`p-2.5 rounded-lg transition-colors focus:outline-none cursor-pointer ${
            task.isImportant 
              ? (isCompleted ? 'text-yellow-500/50 hover:bg-slate-700/80' : 'text-yellow-400 hover:bg-slate-700/80') 
              : 'text-slate-500 hover:text-yellow-400 hover:bg-slate-700/80'
          }`}
          title={task.isImportant ? "Quitar importancia" : "Marcar como importante"}
        >
          <FiStar className="w-5 h-5 cursor-pointer" fill={task.isImportant ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
