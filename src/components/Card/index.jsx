import React from 'react';
import './styles.css';

function Card({ name, capital, bandeira }) {
    return (
        <div className="card" title={name}>
            <div className="background" style={{ backgroundImage: `url(${bandeira})` }}></div>
            <img src={bandeira} alt="Bandeira" />
            <div>
                <h4>{name}</h4>
                <h6>Capital: {capital}</h6>
            </div>
        </div>
    )
}

export default Card;