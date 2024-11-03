// src/components/FileUpload.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import './FileUpload.css';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [permissions, setPermissions] = useState({
    userId: '',    // ID del usuario seleccionado
    canView: false,
    canEdit: false,
    canDelete: false,
  });
  const [uploadStatus, setUploadStatus] = useState('');
  const [users, setUsers] = useState([]); // Lista de usuarios

  // Obtener la lista de usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user`);
        setUsers(response.data); // Guardamos la lista de usuarios
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlePermissionChange = (event) => {
    const { name, type, checked, value } = event.target;
    setPermissions({
      ...permissions,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Por favor, selecciona un archivo.");
      return;
    }

    // Crear el FormData para enviar datos binarios y permisos
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("filename", selectedFile.name);
    formData.append("mimetype", selectedFile.type);
    formData.append("uploaderId", Number(permissions.userId)); // Aseguramos agregar el uploaderId
    formData.append("permissions", JSON.stringify([{ ...permissions }])); // Permisos como JSON

    try {
      const response = await axios.post(`${API_BASE_URL}/file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus("Archivo subido exitosamente!");
      setSelectedFile(null);
      setPermissions({
        userId: '',    // ID del usuario seleccionado
        canView: false,
        canEdit: false,
        canDelete: false,
      });
    } catch (error) {
      setUploadStatus("Error al subir el archivo.");
      console.error(error);
    }
  };

  return (
    <div className='file-upload'>
      <h3>Subir un Archivo</h3>
      <input type="file" onChange={handleFileChange} />
      
      <h4>Permisos</h4>
      <label>
        Usuario:
        <select
          name="userId"
          value={permissions.userId}
          onChange={handlePermissionChange}
        >
          <option value="">Selecciona un usuario</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          name="canView"
          checked={permissions.canView}
          onChange={handlePermissionChange}
        />
        Ver
      </label>
      <label>
        <input
          type="checkbox"
          name="canEdit"
          checked={permissions.canEdit}
          onChange={handlePermissionChange}
        />
        Editar
      </label>
      <label>
        <input
          type="checkbox"
          name="canDelete"
          checked={permissions.canDelete}
          onChange={handlePermissionChange}
        />
        Eliminar
      </label>

      <button onClick={handleUpload}>Subir</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default FileUpload;
