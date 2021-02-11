import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import countries from './countries'
import countryMap from './countryMap'
import layout from './layout'

const reducer = combineReducers({
    countries,
    countryMap,
    layout,
})

const store = configureStore({
    reducer,
})

export default store