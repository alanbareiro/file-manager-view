// src/pages/Register/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const Register = ()=> {
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roleId: 'user' // asignamos siempre un rol de user
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aquí iría la lógica para registrar al usuario, por ejemplo, una petición a un backend
    const response = axios.post(`${API_BASE_URL}/user`, formData);
    const userData = response.data;
    
    if(userData){
      console.log("Succesfull User regiter");
    } else {
      setErrorMessage('Error al registrar un usuario');
    }
    
    console.log('Datos de registro:', formData);
    navigate('/login'); // Redireccionar al login después del registro
  };

  return (
    <div className="register">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-button">Registrarse</button>
      </form>
      <p>{errorMessage}</p>
    </div>
  );
}

export default Register;
