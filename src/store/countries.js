import { createSlice } from "@reduxjs/toolkit";

// Slice
const slice = createSlice({
    name: "countries",
    initialState: {
        countries: [],
        search: "",
        pagination: {
            countries: [],
            last: 0,
            active: 0,
            offset: 12,
        },
    },
    reducers: {
        setCountries: (state, action) => {
            state.countries = action.payload;
            updatePagination(state);
        },
        updateCountry: (state, action) => {
            state.countries = state.countries.map((country) => {
                if (country._id === action.payload._id) {
                    return {
                        ...country,
                        ...action.payload,
                    };
                }

                return country;
            });

            updatePagination(state);
        },
        changePagination: (state, action) => {
            updatePagination(state, action.payload || 0);
        },
        searchCountries: (state, action) => {
            state.search = action.payload.trimStart();
            console.log(state.search.length);
        },
    },
});

const updatePagination = (state, pagePayload = null) => {
    if (pagePayload !== null) {
        state.pagination.active = pagePayload;
    }

    const { pagination, search, countries } = state;
    const { active, offset } = pagination;

    const countriesSearch =
        search.length > 0
            ? countries.filter((country) => {
                  const nameSearch = country.nameClient
                      ? country.nameClient
                      : country.name;
                  return nameSearch
                      .toLowerCase()
                      .includes(search.toLowerCase());
              })
            : countries;

    state.pagination.last = Math.floor(countriesSearch.length / offset) - 1;

    state.pagination.countries = countriesSearch.slice(
        active * offset,
        active * offset + offset
    );
};

// Actions
export const {
    setCountries,
    updateCountry,
    countriesPagination,
    changePagination,
    searchCountries,
} = slice.actions;

export const selectCountries = (state) => state.countries;
export default slice.reducer;
