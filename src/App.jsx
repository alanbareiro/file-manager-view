import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import MainLayout from './components/MainLayout/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Notification from './pages/Notification'
import FileUpload from './pages/File/FileUpload'; // Página para subir archivos
import Files from './pages/File/Files'
import User from './pages/User/User'
import CreateUser from './pages/User/CreateUser'
import EditUser from './pages/User/EditUser/EditUser'
import { AuthProvider } from './contexts/AuthContext'
import Profile from './pages/Profile';
import ProtectedRoutes from './components/ProtectedRoutes';

const App = () => {

  // const { user } = useAuth();

  return (
    <AuthProvider>
      <MainLayout>
        <Routes>
          {/* Si no coincide ninguna ruta, redirige a /register */}
          <Route path="*" element={<Navigate to="/login" replace />} />
          {/* Ruta por defecto: redirige a /register */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Rutas protegidas */}
          <Route path="/dashboard" element={ <ProtectedRoutes> <Home /> </ProtectedRoutes>} />
          <Route path='/profile' element={<ProtectedRoutes> <Profile /> </ProtectedRoutes>} />
          <Route path='/notification' element={<ProtectedRoutes> <Notification /> </ProtectedRoutes>} />
          <Route path='/file' element={<ProtectedRoutes><Files /> </ProtectedRoutes>} />
          <Route path="/file/upload" element={<ProtectedRoutes> <FileUpload /> </ProtectedRoutes>} />
          <Route path='/user' element={<ProtectedRoutes> <User /> </ProtectedRoutes>} />
          <Route path="/user/create" element={<ProtectedRoutes> <CreateUser /> </ProtectedRoutes>} />
          <Route path="/user/edit/:id" element={<ProtectedRoutes> <EditUser /></ProtectedRoutes>} /> 
        </Routes>
      </MainLayout>
    </AuthProvider>
  )
}

export default App;
