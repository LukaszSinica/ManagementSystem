import { useAuth } from '@/lib/AuthContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type AuthenticatedRouteProps = {
    children: ReactNode;
    requiredRole?: string;
}


export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children, requiredRole }) => {

    const auth = useAuth();
    console.log(requiredRole);
    if (auth?.isAuthenticated && (!requiredRole || auth.hasRole(requiredRole))) {
        return <>{children}</>;
    }

    return (
        <Navigate to="/"/>
    )
}
