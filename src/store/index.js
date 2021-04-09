import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import countries from "./countries";
import layout from "./layout";

const reducer = combineReducers({
    countries,
    layout,
});

export const store = configureStore({
    reducer,
});
