import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Countries from './Countries'
import Country from './Country'

function Pages() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Countries} />
            <Route path="/country/:id" component={Country} />
        </BrowserRouter>
    )
}

export default Pages