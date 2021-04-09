import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { store } from "./store";

import { ApolloProvider } from "@apollo/client/react";
import { client } from "./services/apollo";

import { App } from "./App";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
