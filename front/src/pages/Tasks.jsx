import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TaskHeader from '../components/tasks/TaskHeader';
import TaskInput from '../components/tasks/TaskInput';
import TaskList from '../components/tasks/TaskList';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchTasks();
  }, []);

  const handleAddTask = async (title) => {
    try {
      const { data } = await api.post('/tasks', { title });
      setTasks([data, ...tasks]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      const { data } = await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      setTasks(tasks.map(t => t._id === task._id ? data : t));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const toggleImportant = async (task) => {
    try {
      const { data } = await api.put(`/tasks/${task._id}`, { isImportant: !task.isImportant });
      setTasks(tasks.map(t => t._id === task._id ? data : t));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    
    // We only allow reordering of pending tasks
    const pendingTasksArray = tasks.filter(t => !t.completed);
    const completedTasksArray = tasks.filter(t => t.completed);
    
    const [reorderedItem] = pendingTasksArray.splice(result.source.index, 1);
    pendingTasksArray.splice(result.destination.index, 0, reorderedItem);
    
    // Optimistic UI update
    setTasks([...pendingTasksArray, ...completedTasksArray]);
    
    // Sync to backend
    const updatedIds = pendingTasksArray.map(t => t._id);
    try {
      await api.put('/tasks/reorder', { taskIds: updatedIds });
    } catch (error) {
      console.error('Error reordering tasks', error);
      // Revert on error
      fetchTasks();
    }
  };

  return (
    <main className="flex-1 min-h-screen overflow-auto bg-slate-900 p-8 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col h-full mt-4">
        
        <TaskHeader />
        
        <TaskInput onAddTask={handleAddTask} />
        
        <TaskList 
          tasks={tasks}
          onToggleStatus={toggleTaskStatus}
          onToggleImportant={toggleImportant}
          onDelete={deleteTask}
          onDragEnd={handleDragEnd}
        />
        
      </div>
    </main>
  );
};

export default Tasks;
