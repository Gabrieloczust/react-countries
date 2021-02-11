import { createSlice } from '@reduxjs/toolkit'
import api from '../services/api'

// Slice
const slice = createSlice({
    name: 'countries',
    initialState: {
        countries: null,
        isLoading: false,
        error: false,
    },
    reducers: {
        startLoading: state => {
            state.isLoading = true
        },
        hasError: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        countriesSuccess: (state, action) => {
            state.countries = action.payload
            state.isLoading = false
        },
        updateCountry: (state, action) => {
            state.countries = state.countries.map(country => {
                if (country._id === action.payload._id) {
                    country = {
                        ...country,
                        ...action.payload
                    }
                }

                return country
            })
        }
    }
})

export default slice.reducer

// Actions
export const { startLoading, hasError, countriesSuccess, updateCountry } = slice.actions

export const fetchCountries = () => async dispatch => {
    dispatch(startLoading())

    try {
        await api(`Country {
                    _id
                    name
                    capital
                    area
                    population
                    alpha2Code
                    flag {
                        svgFile
                    }
                    topLevelDomains {
                        name
                    }
                }`)
            .then(response => dispatch(countriesSuccess(response.Country)))
    }
    catch (e) {
        dispatch(hasError(e.message))
    }
}

export const selectCountries = state => state.countries
