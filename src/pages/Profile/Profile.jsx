// src/pages/Profile/Profile.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Profile.css';

function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Nombre: {user.name}</p> {/* Asumiendo que el usuario tiene un campo "nombre" */}
          {/* Agrega más información del usuario aquí */}
        </div>
      ) : (
        <p>No hay usuario autenticado.</p>
      )}
    </div>
  );
}

export default Profile;
