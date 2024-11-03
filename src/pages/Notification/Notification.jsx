// src/pages/Notification/Notification.jsx
import React from 'react';
import './Notification.css';

function Notification() {
  // Datos de ejemplo, podrían provenir de una API en el futuro
  const notifications = [
    { id: 1, message: 'Archivo guardado exitosamente.', date: '2024-10-18' },
    { id: 2, message: 'Archivo compartido exitosamente.', date: '2024-10-19' },
  ];

  return (
    <div className="notification">
      <h2>Notificaciones</h2>
      <div className="notification-list">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <p className='notification-message'>{notification.message}</p>
            <span className="notification-date">{notification.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
