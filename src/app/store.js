import { configureStore } from '@reduxjs/toolkit'
import countriesReducer from '../reducers/countriesSlice'

export default configureStore({
  reducer: {
    countries: countriesReducer
  }
})
