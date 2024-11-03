import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import './Files.css';

const Files = () => {
  const [files, setFiles] = useState([]);
  
  // Fetch files from the API
  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/file`);
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Download file
  const downloadFile = async (fileId) => {
    try {
      window.open(`${API_BASE_URL}/file/${fileId}`, '_blank');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  // // Open file in a new tab (assuming it's viewable in the browser)
  // const openFile = (fileId) => {
  //   window.open(`${API_BASE_URL}/file/view/${fileId}`, '_blank');
  // };

  // Delete file
  const deleteFile = async (fileId) => {
    try {
      await axios.delete(`${API_BASE_URL}/file/${fileId}`);
      setFiles(files.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div className="file-container">
      <h2>Lista de Archivos</h2>
      {files.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nombre de Archivo</th>
              <th>Tipo MIME</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td>{file.filename}</td>
                <td>{file.mimetype}</td>
                <td>
                  <button onClick={() => downloadFile(file.id)} className="download-button">Descargar</button>
                  {/* <button onClick={() => openFile(file.id)} className="open-button">Abrir</button> */}
                  <button onClick={() => deleteFile(file.id)} className="delete-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay archivos disponibles.</p>
      )}
    </div>
  );
};

export default Files;

