import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiLoader } from 'react-icons/fi';

const ProtectedRoute = () => {
  const { token, loading, user } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center text-indigo-500">
        <FiLoader className="w-12 h-12 mb-4 animate-spin" />
        <h2 className="text-slate-400 font-medium tracking-wide animate-pulse">Autenticando...</h2>
      </div>
    );
  }

  // Si no hay token guardado rechazar acceso
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
