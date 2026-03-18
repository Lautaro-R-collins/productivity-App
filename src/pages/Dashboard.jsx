import { FiList, FiClock, FiActivity } from 'react-icons/fi';

const Workspace = () => {
  return (
    <main className="flex-1 overflow-auto bg-slate-900 p-6 text-slate-300">
      <h1 className="text-2xl font-bold text-white mb-6">Workspace</h1>
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

export default Workspace;
