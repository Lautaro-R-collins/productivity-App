import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const ChatInput = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-6 bg-slate-900 border-t border-slate-800">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-end gap-2 group">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pregúntale lo que quieras a tu asistente de IA..."
          disabled={isLoading}
          rows={1}
          autoFocus
          className="w-full bg-slate-800 text-white rounded-2xl py-4 pl-6 pr-16 border border-slate-700/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-slate-800 outline-none transition-all text-lg placeholder-slate-500 shadow-inner resize-none min-h-[60px]"
          style={{ fieldSizing: 'content', maxHeight: '200px' }}
        />
        <button 
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`absolute right-2 bottom-2 p-3 rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            input.trim() && !isLoading
              ? 'bg-indigo-500 hover:bg-indigo-400 text-white cursor-pointer active:scale-95' 
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
          title="Enviar mensaje"
        >
          <FiSend className="w-5 h-5" />
        </button>
      </form>
      <p className="text-center text-xs text-slate-500 mt-3 font-medium">
        Llama 3.3 (70B) impulsado por Groq puede cometer errores. Considera verificar la información importante.
      </p>
    </div>
  );
};

export default ChatInput;
