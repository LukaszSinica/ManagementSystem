import { useAuth } from '@/lib/AuthContext';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Authorities } from '@/lib/Authority';

export default function Header() {
    
    const auth = useAuth();
    
    function logout() {
        auth.logout();
    }

    return (
        <header className="flex w-full h-16 items-center justify-between">
            <nav className="flex items-center">
                <h1>Workplace</h1>

                { auth.isAuthenticated && 
                <>
                    <Link to={'/timer'} >Timer</Link> 
                    { auth.hasRole(Authorities["ADMINISTRATOR"]) && <Link to={'/users'} >Users</Link> }
                </>
                }
            </nav>
            { auth.isAuthenticated && <Button onClick={() => logout()}>Logout</Button> }
        </header>
    ) 
}
