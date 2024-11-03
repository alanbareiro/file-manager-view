// src/components/EditUser.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import { useParams } from 'react-router-dom';
import './EditUser.css';

const EditUser = () => {
  const { id } = useParams(); // Obtener el ID de la URL

  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    roleId: '',
  });
  const [roles, setRoles] = useState([]);
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/${id}`);
        setUserData({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          password: '',
          roleId: response.data.roleId,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/role`);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchUserData();
    fetchRoles();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`${API_BASE_URL}/user/${id}`, userData);
      setUpdateStatus("Usuario actualizado exitosamente!");
    } catch (error) {
      setUpdateStatus("Error al actualizar el usuario.");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="edit-user">
      <h3>Editar Usuario</h3>
      <form>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Rol:
          <select
            name="roleId"
            value={userData.roleId}
            onChange={handleInputChange}
          >
            <option value="">Selecciona un rol</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={handleUpdateUser}>
          Actualizar Usuario
        </button>
      </form>
      <p>{updateStatus}</p>
    </div>
  );
};

export default EditUser;
