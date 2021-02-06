import React from 'react'
import './styles.css'

function Button(props) {
    return (
        <button
            {...props}
            className="button"
            color={props.color ? props.color : 'primary'}
            type={props.type ? props.type : 'button'}
            data-testid="button-component"
        >
            {props.children}
        </button>
    )
}

export default Button
