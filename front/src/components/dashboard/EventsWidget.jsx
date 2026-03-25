import React from 'react';
import { FiClock, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { format, isToday, parseISO } from 'date-fns';

const EventsWidget = ({ events }) => {
  const todayEvents = events.filter(e => e.start && isToday(parseISO(e.start))).sort((a, b) => new Date(a.start) - new Date(b.start));

  return (
    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl hover:shadow-amber-500/10 transition-shadow flex flex-col group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-2xl group-hover:bg-amber-500/20 transition-colors">
            <FiClock className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Agenda de Hoy</h3>
            <p className="text-sm text-slate-400">{todayEvents.length} eventos</p>
          </div>
        </div>
        <Link to="/calendar" className="p-2 text-slate-500 hover:text-amber-400 hover:bg-slate-700/50 rounded-xl transition-all outline-none">
          <FiChevronRight className="w-6 h-6" />
        </Link>
      </div>
      
      <div className="flex-1 space-y-3 mb-6">
        {todayEvents.length > 0 ? (
          todayEvents.slice(0, 3).map(event => (
            <div key={event._id} className="flex flex-col p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <span className="text-slate-200 font-medium truncate">{event.title}</span>
              <span className="text-xs text-amber-400/80 mt-1 uppercase tracking-wider font-semibold">
                {format(parseISO(event.start), 'HH:mm')} - {format(parseISO(event.end), 'HH:mm')}
              </span>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-slate-500 h-full">
            <FiClock className="w-8 h-8 mb-2 opacity-50" />
            <p className="font-medium text-slate-400">Libre por hoy.</p>
          </div>
        )}
        {todayEvents.length > 3 && (
          <p className="text-xs text-center text-slate-500 pt-2 font-medium">
            + {todayEvents.length - 3} eventos extra
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-slate-700/80">
        <Link to="/calendar" className="text-amber-400 text-sm font-semibold hover:text-amber-300 w-full text-center block transition-colors outline-none">
          Abrir Calendario
        </Link>
      </div>
    </div>
  );
};

export default EventsWidget;
