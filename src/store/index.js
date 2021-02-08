import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import countries from './countries'
import countryMap from './countryMap'

const reducer = combineReducers({
    countries,
    countryMap
})

const store = configureStore({
    reducer,
})

export default store