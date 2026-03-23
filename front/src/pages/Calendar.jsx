import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FiCalendar, FiPlus } from 'react-icons/fi';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      title: 'Reunión de planificación',
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Introduce el título de tu nuevo recordatorio:');
    if (title) {
      setEvents((prev) => [...prev, { start, end, title }]);
    }
  };

  const handleSelectEvent = (event) => {
    window.alert(`Has seleccionado el evento: ${event.title}`);
  };

  return (
    <main className="flex-1 overflow-auto bg-slate-900 p-6 text-slate-300 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <FiCalendar className="w-8 h-8 text-indigo-500" />
          <h1 className="text-2xl font-bold text-white">Calendar</h1>
        </div>
        <button 
          onClick={() => handleSelectSlot({ start: new Date(), end: new Date() })}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition shadow-md"
        >
          <FiPlus /> Nuevo Recordatorio
        </button>
      </div>
      
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg flex-1 min-h-[600px] overflow-hidden rb-calendar-dark">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          views={['month', 'week', 'day', 'agenda']}
          className="h-full"
          messages={{
            next: "Sig",
            previous: "Ant",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda"
          }}
        />
      </div>
    </main>
  );
};

export default Calendar;
