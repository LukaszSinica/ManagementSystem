import { useAuth } from '../../lib/AuthContext';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export default function Home() {  
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <main className="flex justify-center items-center">
      welcome {auth.username}!
    </main>
  )
}
