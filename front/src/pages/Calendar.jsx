import React, { useState } from 'react';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarView from '../components/calendar/CalendarView';

const CalendarPage = () => {
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
      <CalendarHeader onAddEvent={() => handleSelectSlot({ start: new Date(), end: new Date() })} />
      <CalendarView 
        events={events} 
        onSelectSlot={handleSelectSlot} 
        onSelectEvent={handleSelectEvent} 
      />
    </main>
  );
};

export default CalendarPage;
