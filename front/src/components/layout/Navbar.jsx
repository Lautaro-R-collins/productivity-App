import React, { useState, useEffect } from 'react';
import { FiBell, FiUser } from 'react-icons/fi';
import api from '../../services/api';
import { isToday } from 'date-fns';

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchTodaysEvents = async () => {
    try {
      const { data } = await api.get('/events');
      const todaysEvents = data.filter(evt => {
        const eventDate = new Date(evt.start);
        return isToday(eventDate);
      });
      setNotifications(todaysEvents);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchTodaysEvents();
    // Poll the server every 1 minute to check for new events
    const interval = setInterval(fetchTodaysEvents, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-end px-6 text-slate-300">
      <div className="flex items-center space-x-6 relative">
        <button 
          className="text-slate-400 cursor-pointer hover:text-white transition relative"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <FiBell className="w-5 h-5" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute top-full right-10 mt-4 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-700 bg-slate-800/80">
              <h3 className="font-semibold text-white">Notificaciones</h3>
              <p className="text-xs text-slate-400">Recordatorios para Hoy</p>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif, index) => (
                  <div key={notif._id || index} className="px-4 py-3 border-b border-slate-700/50 hover:bg-slate-700 transition cursor-default">
                    <p className="text-sm text-white font-medium">{notif.title}</p>
                    <p className="text-xs text-indigo-400 mt-1">
                      {new Date(notif.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                      {' - '}
                      {new Date(notif.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-sm text-slate-400">
                  Todo al día. No hay eventos para hoy.
                </div>
              )}
            </div>
          </div>
        )}

        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white cursor-pointer hover:bg-slate-600 transition">
          <FiUser className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
