import { FiX, FiTrash2, FiSave } from 'react-icons/fi';

const EventModal = ({ isOpen, onClose, onSave, onDelete, eventData, isEditing, title, setTitle }) => {

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ ...eventData, title });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md border border-slate-700 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it if we add outside-click logic
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? 'Editar Recordatorio' : 'Nuevo Recordatorio'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white transition"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-8">
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Título del Evento
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Reunión de diseño..."
              className="w-full bg-slate-900 text-white rounded-lg border border-slate-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              autoFocus
            />
          </div>
          
          <div className="flex justify-end items-center gap-3">
            {isEditing && (
              <button
                type="button"
                onClick={() => onDelete(eventData._id)}
                className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2.5 rounded-lg transition mr-auto font-medium"
              >
                <FiTrash2 className="w-4 h-4" /> Eliminar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg transition shadow-md font-medium"
            >
              <FiSave className="w-4 h-4" /> {isEditing ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
