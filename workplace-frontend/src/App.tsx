import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginComponent } from './components/login/LoginComponent'
import { Toaster } from './components/ui/toaster'
import { AuthProvider } from './lib/AuthContext'
import Home from './components/home/Home'
import { AuthenticatedRoute } from './components/AuthenticatedRoute'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginComponent/>}/>
          <Route path='/login' element={<LoginComponent/>}/>
          <Route path='/home' element={
            <AuthenticatedRoute>
              <Home/>
            </AuthenticatedRoute>
          } />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  )
}

export default App
