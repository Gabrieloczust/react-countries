import React from 'react'
import './styles.css'

export default function List({ list }) {

    return (
        <ul className="listComponent">
            {list && list.map((item, index) => (
                <li key={index}>
                    <b>{item.name}: </b>
                    <span>{item.value}</span>
                </li>
            ))}
        </ul>
    )
}