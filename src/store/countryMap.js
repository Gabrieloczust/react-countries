import { createSlice } from '@reduxjs/toolkit'
import api from '../services/api'

// Slice
const slice = createSlice({
    name: 'countryMap',
    initialState: {
        countryMap: null,
        isLoading: true,
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
        countryMapSuccess: (state, action) => {
            state.countryMap = action.payload
            state.isLoading = false
        },
    }
})

export default slice.reducer

// Actions
const { startLoading, hasError, countryMapSuccess } = slice.actions

export const fetchCountryMap = (id, countries) => async dispatch => {
    dispatch(startLoading())

    try {
        await api(`Country(_id: "${id}") {
                    alpha2Code
                    distanceToOtherCountries(first: 5) {
                        distanceInKm
                        countryName
                    }
                }`)
            .then(response => {
                const distanceToOtherCountries = response.Country[0].distanceToOtherCountries

                const worldMapData = distanceToOtherCountries?.map(country => {
                    const countryFind = countries?.find(c => c.name === country.countryName)

                    return {
                        country: countryFind?.alpha2Code?.toLowerCase(),
                        value: country.distanceInKm.toFixed(2),
                    }
                })

                const valueTotal = worldMapData.reduce((prevVal, element) => {
                    return prevVal + parseInt(element.value)
                }, 500).toFixed(2).toString()

                dispatch(countryMapSuccess([...worldMapData, {
                    country: response?.Country[0]?.alpha2Code?.toLowerCase(),
                    value: valueTotal,
                }]))
            })
    }
    catch (e) {
        dispatch(hasError(e.message))
    }
}

export const selectCountryMap = state => state.countryMap
