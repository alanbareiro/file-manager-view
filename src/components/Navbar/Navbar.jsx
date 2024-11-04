import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBell, FaClipboardList, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo_mod_bgt from '../../assets/logo_mod_bgt.png'

function Navbar() {

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirige a la página de inicio de sesión
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to={user ? '/dashboard' : 'login'} style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
          <img src={logo_mod_bgt} alt='File Manager' />
          <p>File Manager</p>
        </Link>
      </div>
      <ul className="navbar-links">
        {
          user ? (
            <>
              {/* Show user name and user-related options if logged in */}
              <li className="user">
                <Link to="/profile" title={user ? user.name : "Perfil"}>
                  <FaUser size={24} style={{ marginRight: '8px' }} />
                  {/* {user.name} */}
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <FaSignOutAlt size={24} />
                </button>
              </li>
              <li className="notifications">
                <Link to="/notification" title="Notificaciones">
                  <FaBell size={24} />
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* Show login and register links if not logged in */}

              <li><Link to="/login">Iniciar Sesión</Link></li>
              <li><Link to="/register">Registrarse</Link></li>

            </>
          )

        }
      </ul>
    </nav>
  );
}

export default Navbar;
