import React from 'react'
import './styles.css'

function Button(props) {
    return (
        <button className="button" data-testid="button-component" {...props}>{props.children}</button>
    )
}

export default Button
