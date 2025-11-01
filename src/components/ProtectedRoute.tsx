import { type JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';

interface ProtectedRouteProps {
    children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect unauthenticated users to login, preserving the attempted route
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
