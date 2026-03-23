import { FiCalendar } from 'react-icons/fi';

const Calendar = () => {
  return (
    <main className="flex-1 overflow-auto bg-slate-900 p-6 text-slate-300">
      <div className="flex items-center gap-3 mb-6">
        <FiCalendar className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold text-white">Calendar</h1>
      </div>
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-sm">
        <p className="text-slate-400">Your calendar events will appear here.</p>
      </div>
    </main>
  );
};

export default Calendar;
