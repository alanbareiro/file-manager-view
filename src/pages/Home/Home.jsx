import React, { useEffect } from 'react';
import { FaUserMd, FaCalendarAlt, FaHistory } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card'
import './Home.css';
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

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

    // const fetchPermissions = async () => {
    //   axios.get(`${API_BASE_URL}/permissions`)
    //         .then(response => setSharedLength(response.data.length))
    //         .catch(error => console.log('Error getting files: ', error));
    // }



    useEffect(()=> {fetchUsers(); fetchFiles(); }, [] );

return (
    
    <div className="home">
      <Card
        title="Usuarios"
        description={"Cantidad de Usuarios: " + users} 
        onClick={() => navigate('/user')}
        icon={<FaUserMd size={48} className="card-icon" />}
      />
      <Card
        title="Archivos"
        description={"Cantidad de Archivos: " + filesLength} 
        onClick={() => navigate('/file')}
        icon={<FaCalendarAlt size={48} className="card-icon" />}
      />
      <Card
        title="Archivos compartidos"
        description={"Cantidad de Archivos compartidos: " + sharedLength} 
        onClick={() => navigate('/file/shared')}
        icon={<FaHistory size={48} className="card-icon" />}
      />
    </div>
  );
}

export default Home;