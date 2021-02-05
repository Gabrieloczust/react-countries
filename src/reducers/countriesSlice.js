import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'

export const fetchCountries = createAsyncThunk('',
  async () => {
    const response = await api(`
      Country {
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
      }
    `)

    return response.Country
  }
)

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    value: [],
  },
  reducers: {
  },
  extraReducers: {
    [fetchCountries.fulfilled]: (state, action) => {
      state.value = action.payload
    }
  }
})

// export const { fetchCountries } = countriesSlice.actions
export const selectCountries = state => state.countries

export default countriesSlice.reducer
