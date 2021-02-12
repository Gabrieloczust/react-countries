import { createSlice } from '@reduxjs/toolkit'
import api from '../services/api'

// Slice
const slice = createSlice({
    name: 'countries',
    initialState: {
        countries: null,
        isLoading: false,
        error: false,
        search: '',
        pagination: {
            countries: null,
            last: 0,
            active: 0,
            offset: 8,
        }
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
            state.countries2 = action.payload
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
        },
        changePagination: (state, action) => {
            const page = Number(action.payload) || 0

            const countriesSearch = state.search.length > 0
                ? state.countries.filter(country => {
                    const nameSearch = country.nameClient ? country.nameClient : country.name
                    return nameSearch.toLowerCase().includes(state.search.toLowerCase())
                })
                : state.countries

            if (searchCountries.length <= 24) {
                state.pagination.offset = 24
            }

            state.pagination.last = Number((countriesSearch.length / state.pagination.offset).toFixed())
            state.pagination.active = page
            state.pagination.countries = countriesSearch.slice(
                page * state.pagination.offset,
                page * state.pagination.offset + state.pagination.offset
            )
        },
        searchCountries: (state, action) => {
            state.search = action.payload
        }
    }
})

export default slice.reducer

// Actions
export const {
    startLoading, hasError, countriesSuccess, updateCountry,
    countriesPagination, changePagination, searchCountries
} = slice.actions

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
            .then(response => {
                dispatch(countriesSuccess(response.Country))
                dispatch(changePagination())
            })
    }
    catch (e) {
        dispatch(hasError(e.message))
    }
}

export const selectCountries = state => state.countries
