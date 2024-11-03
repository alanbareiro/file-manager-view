import React from 'react'
import './Card.css';

const Card = ({title, description, onClick, icon}) => {

  return (
    <div className='card' onClick={onClick}>
      <div className='card-icon-container'>{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
  );
};

export default Card;