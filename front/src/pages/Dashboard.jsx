import React, { useState, useEffect } from 'react';
import { FiList, FiClock, FiActivity, FiServer } from 'react-icons/fi';
import api from '../../services/api';

const Dashboard = () => {
  const [apiStatus, setApiStatus] = useState('Desconectado');

  useEffect(() => {
    api.get('/health')
      .then((res) => {
        if (res.data.status === 'success') {
          setApiStatus('Conectado');
        }
      })
      .catch((err) => {
        console.error('API connection failed:', err);
        setApiStatus('Error de conexión');
      });
  }, []);

  return (
    <main className="flex-1 overflow-auto bg-slate-900 p-6 text-slate-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          <FiServer className={`w-4 h-4 ${apiStatus === 'Conectado' ? 'text-green-500' : 'text-red-500'}`} />
          <span className="text-sm font-medium">{apiStatus}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-sm hover:border-slate-600 transition group">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition">
              <FiList className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Recent Tasks</h3>
          </div>
          <p className="text-sm text-slate-400">You have 3 tasks pending today.</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-sm hover:border-slate-600 transition group">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition">
              <FiClock className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
          </div>
          <p className="text-sm text-slate-400">Team meeting at 3:00 PM.</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-sm hover:border-slate-600 transition group">
          <div className="flex items-center gap-3 mb-3">
             <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition">
               <FiActivity className="w-6 h-6 text-emerald-400" />
             </div>
             <h3 className="text-lg font-semibold text-white">Statistics</h3>
          </div>
          <p className="text-sm text-slate-400">Productivity increased by 15%.</p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
