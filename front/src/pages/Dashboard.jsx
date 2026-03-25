import React, { useState, useEffect } from 'react';
import api from '../services/api';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import TasksWidget from '../components/dashboard/TasksWidget';
import EventsWidget from '../components/dashboard/EventsWidget';
import AnalyticsWidget from '../components/dashboard/AnalyticsWidget';

const Dashboard = () => {
  const [apiStatus, setApiStatus] = useState('Conectando...');
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthRes, tasksRes, eventsRes] = await Promise.all([
          api.get('/health').catch(() => ({ data: { status: 'error' } })),
          api.get('/tasks').catch(() => ({ data: [] })),
          api.get('/events').catch(() => ({ data: [] }))
        ]);
        
        setApiStatus(healthRes.data.status === 'success' ? 'Conectado' : 'Desconectado');
        setTasks(tasksRes.data || []);
        setEvents(eventsRes.data || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setApiStatus('Error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="flex-1 overflow-auto bg-slate-900 p-8 flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="flex-1 min-h-screen overflow-auto bg-slate-900 p-8 text-slate-300">
      <DashboardHeader apiStatus={apiStatus} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <TasksWidget tasks={tasks} />
        <EventsWidget events={events} />
        <AnalyticsWidget tasks={tasks} />
      </div>
    </main>
  );
};

export default Dashboard;
