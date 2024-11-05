import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';
import axios from 'axios';
import './User.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai'; // Importa el ícono

const User = () => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/user`)
      .then(response => setUsers(response.data))
      .catch(error => console.log('Error getting Users: ', error));
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/user/${id}`);
      setUsers(users.filter(user => user.id !== id)); // Actualiza la lista sin el usuario borrado
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  // Función para editar los permisos de un usuario
  const editPermissions = (id) => {
    console.log('Editar permisos de usuario con ID:', id);
    navigate(`/user/edit/${id}`);
  };

  // Función para agregar un usuario nuevo
  const addUser = () => {
    console.log('Agregar un nuevo usuario');
    navigate('/user/create');
  };

  return (
    <div className="user-list">
      <h2>Lista de Usuarios</h2>
      <button onClick={addUser} className="add-button">   <AiOutlinePlus /> {/* Usa el ícono aquí */}</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.roleId}</td>
                <td>
                  <button onClick={() => editPermissions(user.id)} className="edit-button">Editar</button>
                  <button onClick={() => deleteUser(user.id)} className="delete-button">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay usuarios disponibles</td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

export default User;