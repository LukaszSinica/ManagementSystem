import { useAuth } from '../../lib/AuthContext';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export default function Home() {  
  const auth = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    auth?.logout();
    navigate('/');
  }

  return (
    <div>
      Home
      <Button onClick={() => onLogout()}>Logout</Button>
    </div>
  )
}
