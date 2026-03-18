import { FiCheckSquare } from 'react-icons/fi';

const Tasks = () => {
  return (
    <main className="flex-1 overflow-auto bg-slate-900 p-6 text-slate-300">
      <div className="flex items-center gap-3 mb-6">
        <FiCheckSquare className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold text-white">Tasks</h1>
      </div>
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-sm">
        <p className="text-slate-400">Your tasks will appear here.</p>
      </div>
    </main>
  );
};

export default Tasks;
