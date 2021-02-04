import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

function Card({ to, name, capital, bandeira }) {
    return (
        <Link
            className="card"
            title={name}
            to={to}
        >
            <div className="background" style={{ backgroundImage: `url(${bandeira})` }}></div>
            <img src={bandeira} alt="Bandeira" />

            <div className="content">
                <h4>{name}</h4>
                <h6>Capital: {capital}</h6>
            </div>
        </Link>
    )
}

export default Card