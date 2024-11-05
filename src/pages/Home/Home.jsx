import React, { useEffect, useState } from 'react';
import { FaUser, FaCloud, FaHistory } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import './Home.css';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import logo_mod_bt from '../../assets/logo_mod_bgt.png'

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filesLength, setFilesLength] = useState([]);
  const [sharedLength, setSharedLength] = useState(0);

  const fetchUsers = async () => {
    axios.get(`${API_BASE_URL}/user`)
      .then(response => setUsers(response.data.length))
      .catch(error => console.log('Error getting Users: ', error));
  }

  const fetchFiles = async () => {
    axios.get(`${API_BASE_URL}/file`)
      .then(response => setFilesLength(response.data.length))
      .catch(error => console.log('Error getting files: ', error));
  }

  useEffect(() => {
    fetchUsers();
    fetchFiles();
  }, []);

  return (
    <>
      <div className="info">
        <div className='info-title'>
        <h1>Bienvenido a File Manager</h1>
          <img src={logo_mod_bt} alt='logo' className='logo'/>
        </div>
        <p>
          Gestiona y comparte archivos de manera facil y rapida en la nube.
        </p>
      </div>
      <div className="home">


        <Card
          title="Usuarios"
          description={`Cantidad de Usuarios: ${users}`}
          onClick={() => navigate('/user')}
          icon={<FaUser size={48} className="card-icon" />}
        />
        <Card
          title="Archivos"
          description={`Archivos en la nube: ${filesLength}`}
          onClick={() => navigate('/file')}
          icon={<FaCloud size={48} className="card-icon" />}
        />
        {/* <Card
          title="Archivos compartidos"
          description={`Cantidad de Archivos compartidos: ${sharedLength}`}
          onClick={() => navigate('/file/shared')}
          icon={<FaHistory size={48} className="card-icon" />}
        /> */}
      </div>
    </>
  );
}

export default Home;
