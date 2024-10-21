import { useAuth } from '../../lib/AuthContext';

export default function Home() {  
  const auth = useAuth();

  return (
    <main className="flex justify-center items-center">
      welcome {auth.username}!
    </main>
  )
}
