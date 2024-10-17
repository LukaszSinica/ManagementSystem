import { useAuth } from '@/lib/AuthContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const AuthenticatedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {

    const auth = useAuth();
    
    if(auth?.isAuthenticated) {
        return children;
    }

    return (
        <Navigate to="/"/>
    )
}
