import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const TaskInput = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title);
    setTitle('');
  };

  return (
    <div className="mb-8 relative shadow-xl rounded-xl cursor-text">
      <form onSubmit={handleSubmit} className="relative flex items-center group w-full">
        <button 
          type="submit"
          className="absolute left-5 text-indigo-500 transition-transform group-focus-within:scale-110 cursor-pointer focus:outline-none hover:text-indigo-400 z-10 p-2"
          title="Agregar tarea"
        >
          <FiPlus className="w-6 h-6 cursor-pointer" />
        </button>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Agregar una tarea..."
          className="w-full bg-slate-800 text-white rounded-xl py-4 pl-16 pr-6 border border-slate-700/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-slate-800 outline-none transition-all text-lg placeholder-slate-400 shadow-inner"
        />
      </form>
    </div>
  );
};

export default TaskInput;
