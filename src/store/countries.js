import { createSlice } from '@reduxjs/toolkit'
import api from '../services/api'

const initialCountries = localStorage.getItem('countries')
    ? JSON.parse(localStorage.getItem('countries'))
    : null

const initialCountrie = localStorage.getItem('countrie')
    ? JSON.parse(localStorage.getItem('countrie'))
    : null

// Slice
const slice = createSlice({
    name: 'countries',
    initialState: {
        countries: initialCountries,
        countrie: initialCountrie,
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
            localStorage.setItem('countries', JSON.stringify(action.payload))

            state.isLoading = false
        },
        countrieSuccess: (state, action) => {
            state.countrie = state.countries.find(countrie => countrie._id === action.payload)

            if (state.countrie) {
                localStorage.setItem('countrie', JSON.stringify(state.countrie))
            }
        },
    }
})

export default slice.reducer

// Actions

const { startLoading, hasError, countriesSuccess, countrieSuccess } = slice.actions

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

export const getCountrie = id => dispatch => {
    dispatch(countrieSuccess(id))
}

export const selectCountries = state => state.countries
