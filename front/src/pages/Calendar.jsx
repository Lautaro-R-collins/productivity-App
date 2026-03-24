import React, { useState, useEffect } from 'react';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarView from '../components/calendar/CalendarView';
import EventModal from '../components/calendar/EventModal';
import api from '../services/api';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  
  // Modal State Control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventData, setCurrentEventData] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  // Hoisted function definition fixes the 'Cannot access variable before it is declared' error
  async function fetchEvents() {
    try {
      const { data } = await api.get('/events');
      const formattedEvents = data.map(evt => ({
        ...evt,
        start: new Date(evt.start),
        end: new Date(evt.end)
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line
    fetchEvents();
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    setCurrentEventData({ start, end });
    setModalTitle('');
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setCurrentEventData(event);
    setModalTitle(event.title);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEventData(null);
    setModalTitle('');
  };

  const handleSaveEvent = async (eventData) => {
    try {
      if (isEditing) {
        if (eventData._id) {
          const { data } = await api.put(`/events/${eventData._id}`, { title: eventData.title });
          setEvents((prev) => prev.map((e) => 
            e._id === eventData._id 
            ? { ...data, start: new Date(data.start), end: new Date(data.end) } 
            : e
          ));
        } else {
           setEvents((prev) => prev.map((e) => e === currentEventData ? { ...e, title: eventData.title } : e));
        }
      } else {
        const { data } = await api.post('/events', { 
          title: eventData.title, 
          start: eventData.start, 
          end: eventData.end 
        });
        const newEvent = { ...data, start: new Date(data.start), end: new Date(data.end) };
        setEvents((prev) => [...prev, newEvent]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving event:', error);
      window.alert('Error al guardar el evento en la base de datos.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!eventId) {
      setEvents((prev) => prev.filter((e) => e !== currentEventData));
      handleCloseModal();
      return;
    }
    
    try {
      await api.delete(`/events/${eventId}`);
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting event:', error);
      window.alert('Error al intentar eliminar el evento.');
    }
  };

  return (
    <main className="flex-1 overflow-auto bg-slate-900 p-6 text-slate-300 flex flex-col relative">
      <CalendarHeader onAddEvent={() => handleSelectSlot({ start: new Date(), end: new Date() })} />
      <CalendarView 
        events={events} 
        onSelectSlot={handleSelectSlot} 
        onSelectEvent={handleSelectEvent} 
      />

      <EventModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        eventData={currentEventData}
        isEditing={isEditing}
        title={modalTitle}
        setTitle={setModalTitle}
      />
    </main>
  );
};

export default CalendarPage;
