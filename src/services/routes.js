import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Countries from '../pages/Countries'
import Country from '../pages/Country'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Countries} />
            <Route path="/country/:id" component={Country} />
        </BrowserRouter>
    )
}

export default Routes