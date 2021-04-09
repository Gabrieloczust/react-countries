import { createSlice } from "@reduxjs/toolkit";

// Slice
const slice = createSlice({
    name: "countries",
    initialState: {
        countries: null,
        error: false,
        search: "",
        pagination: {
            countries: [],
            last: 0,
            active: 0,
            offset: 16,
        },
    },
    reducers: {
        setCountries: (state, action) => {
            state.countries = action.payload;
        },
        updateCountry: (state, action) => {
            state.countries = state.countries.map((country) => {
                if (country._id === action.payload._id) {
                    country = {
                        ...country,
                        ...action.payload,
                    };
                }

                return country;
            });
        },
        changePagination: (state, action) => {
            const page = Number(action.payload) || 0;

            const countriesSearch =
                state.search.length > 0
                    ? state.countries.filter((country) => {
                          const nameSearch = country.nameClient
                              ? country.nameClient
                              : country.name;
                          return nameSearch
                              .toLowerCase()
                              .includes(state.search.toLowerCase());
                      })
                    : state.countries;

            state.pagination.last =
                Math.floor(countriesSearch.length / state.pagination.offset) -
                1;
            state.pagination.active = page;
            state.pagination.countries = countriesSearch.slice(
                page * state.pagination.offset,
                page * state.pagination.offset + state.pagination.offset
            );
        },
        searchCountries: (state, action) => {
            state.search = action.payload;
        },
    },
});

export default slice.reducer;

// Actions
export const {
    setCountries,
    updateCountry,
    countriesPagination,
    changePagination,
    searchCountries,
} = slice.actions;

export const selectCountries = (state) => state.countries;
