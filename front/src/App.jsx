import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}   

export default App;
