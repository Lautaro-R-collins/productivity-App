import React from 'react';
import { FiCpu } from 'react-icons/fi';

const AssistantHeader = ({ isTyping }) => {
  return (
    <div className="flex items-center gap-3 p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md z-10 sticky top-0 shadow-sm">
      <div className="p-3 bg-indigo-500/10 rounded-xl">
        <FiCpu className="w-6 h-6 text-indigo-400" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Llama 3.3 (70B)</h1>
        <p className={`text-sm font-medium flex items-center gap-1.5 mt-0.5 ${isTyping ? 'text-indigo-400' : 'text-emerald-400'}`}>
          <span className={`w-2 h-2 rounded-full animate-pulse ${isTyping ? 'bg-indigo-500' : 'bg-emerald-500'}`}></span> 
          {isTyping ? 'Escribiendo...' : 'En línea'}
        </p>
      </div>
    </div>
  );
};

export default AssistantHeader;
