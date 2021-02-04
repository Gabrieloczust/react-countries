import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Countries from '../pages/Countries'
import Countrie from '../pages/Countrie'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Countries} />
            <Route path="/countrie/:id" component={Countrie} />
        </BrowserRouter>
    )
}

export default Routes