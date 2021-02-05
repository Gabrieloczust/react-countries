import React from 'react'
import './styles.css'

function Container(props) {
    return (
        <div className="container" data-testid="container-component" {...props}>
            {props.children}
        </div>
    )
}

export default Container