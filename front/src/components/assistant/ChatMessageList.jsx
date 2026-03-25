import React from 'react';
import { FiCpu, FiUser, FiMoreHorizontal } from 'react-icons/fi';

const ChatMessageList = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth">
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex gap-4 max-w-4xl mx-auto w-full ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-indigo-300'
          }`}>
            {msg.role === 'user' ? <FiUser className="w-5 h-5" /> : <FiCpu className="w-5 h-5" />}
          </div>
          
          <div className={`p-4 rounded-2xl max-w-[80%] whitespace-pre-wrap leading-relaxed shadow-sm ${
            msg.role === 'user' 
              ? 'bg-indigo-600 text-white rounded-tr-sm' 
              : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm'
          }`}>
            {msg.content}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4 max-w-4xl mx-auto w-full flex-row">
          <div className="shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-indigo-300">
            <FiCpu className="w-5 h-5" />
          </div>
          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 text-indigo-300 rounded-tl-sm flex items-center gap-1 w-24 shadow-sm">
            <FiMoreHorizontal className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} className="h-4" />
    </div>
  );
};

export default ChatMessageList;
