import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden font-sans text-slate-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        {/* Main Content Area */}
        <div className="flex-1 overflow-auto relative z-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
