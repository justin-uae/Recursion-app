import { type JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // Redirect unauthenticated users to login, preserving the attempted route
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
