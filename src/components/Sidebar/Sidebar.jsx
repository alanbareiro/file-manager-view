// src/components/Sidebar/Sidebar.jsx
import React, { useState } from 'react';
import { FaUser, FaFile, FaFileUpload, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>Gestión de Usuarios</h2>
        <ul>
          <li>
            <Link to="/user" onClick={() => setIsOpen(false)}>
              <FaUser className="icon" /> Ver Usuarios
            </Link>
          </li>
        </ul>

        <h2>Gestión de Archivos</h2>
        <ul>
          <li>
            <Link to="/file" onClick={() => setIsOpen(false)}>
              <FaFile className="icon" /> Ver Archivos
            </Link>
          </li>
          <li>
            <Link to="/file/upload" onClick={() => setIsOpen(false)}>
              <FaFileUpload className="icon" /> Subir Archivo
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
