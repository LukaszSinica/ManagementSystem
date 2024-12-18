import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginComponent } from './components/login/LoginComponent'
import { Toaster } from './components/ui/toaster'
import { AuthProvider } from './lib/AuthContext'
import Home from './components/home/Home'
import { AuthenticatedRoute } from './components/AuthenticatedRoute'
import Header from './components/header/Header'
import Timer from './components/timer/Timer'
import { AuthenticatedRoutePaths } from './lib/RoutePaths'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<LoginComponent/>}/>
          <Route path='/login' element={<LoginComponent/>}/>
          {AuthenticatedRoutePaths}
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  )
}

export default App
