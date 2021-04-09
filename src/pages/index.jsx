import { BrowserRouter, Route } from "react-router-dom";

import { Countries } from "./Countries";
import { Country } from "./Country";

export const Pages = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Countries} />
            <Route path="/country/:id" component={Country} />
        </BrowserRouter>
    );
};
