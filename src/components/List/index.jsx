import React from 'react'
import './styles.css'

export default function List({ list }) {

    return (
        <ul className="listComponent" data-testid="list-component">
            {list && list.map((item, index) => (
                <li key={index}>
                    <b>{item.name}: </b>
                    <span>{item.value}</span>
                </li>
            ))}
        </ul>
    )
}