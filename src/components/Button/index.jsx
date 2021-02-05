import React from 'react'
import './styles.css'

function Button(props) {
    return (
        <button className="button" data-testid="button-children" {...props}>{props.children}</button>
    )
}

export default Button
