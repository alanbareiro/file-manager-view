import './CreateUser.css'
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate;

const CreateUser = () => {
  const [roles, setRoles] = useState([]); // Para almacenar roles desde la API
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roleId: ''
  });

  // Función para cargar roles desde la API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/role`); // Ajusta la URL según tu endpoint
        setRoles(response.data);
      } catch (error) {
        console.error('Error al cargar los roles:', error);
      }
    };
    fetchRoles();
  }, []);

  // Manejador de cambio para los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/user`, formData); // Ajusta la URL según tu endpoint
      console.log('Usuario creado exitosamente:', response.data);
      // Aquí puedes redirigir o resetear el formulario si deseas
      setFormData({
        name: '',
        email: '',
        password: '',
        roleId: ''
      });

      navigate('/user');
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  return (
    <div className="create-user-form">
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rol:</label>
          <select
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un rol</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CreateUser;
