import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
// import { useAppSelector } from '../store';

interface ProtectedRouteProps {
    children: ReactNode;
    redirectTo?: string;
}

/**
 * Protected Route wrapper component
 * Redirects unauthenticated users to the login page
 * 
 * Usage:
 * <Route 
 *   path="/dashboard" 
 *   element={
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   } 
 * />
 */
export const ProtectedRoute = ({
    children,
    redirectTo = '/login'
}: ProtectedRouteProps) => {
    const location = useLocation();

    // TODO: Replace with actual auth state from Redux
    // const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const isAuthenticated = false; // Placeholder - connect to your auth state

    if (!isAuthenticated) {
        // Redirect to login page, but save the attempted location
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
