import { createSlice } from '@reduxjs/toolkit'
import api from '../services/api'

// Slice
const slice = createSlice({
    name: 'countries',
    initialState: {
        countries: [],
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

            console.error(state.error)
        },
        countriesSuccess: (state, action) => {
            state.countries = action.payload
            state.isLoading = false
        },
    }
})

export default slice.reducer

// Actions

const { startLoading, hasError, countriesSuccess } = slice.actions

export const fetchCountries = () => async dispatch => {
    dispatch(startLoading())

    try {
        await api(`Country {
                    _id
                    name
                    capital
                    area
                    population
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

