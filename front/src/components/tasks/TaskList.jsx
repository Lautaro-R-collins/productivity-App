import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FiSun } from 'react-icons/fi';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleStatus, onToggleImportant, onDelete, onDragEnd }) => {
  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="flex-1 overflow-y-auto pr-2 space-y-2 pb-20 custom-scrollbar">
      
      {/* Pending Tasks with Drag and Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="pending-tasks-list">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className="space-y-2 min-h-[2px]"
            >
              {pendingTasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided, snapshot) => (
                    <TaskItem 
                      task={task}
                      onToggleStatus={onToggleStatus}
                      onToggleImportant={onToggleImportant}
                      onDelete={onDelete}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Completed Tasks (Not draggable for simplicity) */}
      {completedTasks.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-800/60">
          <h2 className="text-xs font-bold text-slate-500 mb-4 px-2 uppercase tracking-widest cursor-default">
            Completadas ({completedTasks.length})
          </h2>
          <div className="space-y-2">
            {completedTasks.map(task => (
              <TaskItem 
                key={task._id}
                task={task}
                onToggleStatus={onToggleStatus}
                onToggleImportant={onToggleImportant}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-slate-500 animate-pulse cursor-default">
          <FiSun className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-xl font-medium">Tu día está libre.</p>
          <p className="text-sm mt-1">Agrega una tarea arriba para comenzar.</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
