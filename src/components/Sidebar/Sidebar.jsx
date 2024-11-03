// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { FaUserCog, FaFileAlt, FaKey, FaUserPlus, FaUserEdit, FaUserTimes, FaFileUpload, FaTrash, FaUser, FaFile } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Crea un archivo CSS para darle estilo al sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Gestión de Usuarios</h2>
      <ul>
        <li>
          <Link to="/user">
            <FaUser className="icon" /> Ver Usuarios
          </Link>
        </li>

      </ul>

      <h2>Gestión de Archivos</h2>
      <ul>
        <li>
          <Link to="/file">
            <FaFile className="icon" /> Ver Archivos
          </Link>
        </li>
        <li>
          <Link to="/file/upload">
            <FaFileUpload className="icon" /> Subir Archivo
          </Link>
        </li>


      </ul>
    </div>
  );
};

export default Sidebar;
