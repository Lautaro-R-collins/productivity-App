import React, { useContext } from 'react';
import { FiServer } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';

const DashboardHeader = ({ apiStatus }) => {
  const { user } = useContext(AuthContext);
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 20) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <div className="flex justify-between items-start mb-10 border-b border-slate-800 pb-6 w-full max-w-6xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">{getGreeting()}, {user?.username || 'Invitado'}</h1>
        <p className="text-slate-400 text-lg">Aquí tienes un resumen de tu día.</p>
      </div>
      <div className="flex items-center gap-2 bg-slate-800 px-4 py-2.5 rounded-full border border-slate-700 shadow-sm transition-all hover:bg-slate-700">
        <FiServer className={`w-5 h-5 ${apiStatus === 'Conectado' ? 'text-emerald-500' : 'text-rose-500'}`} />
        <span className="text-sm font-medium">{apiStatus}</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
