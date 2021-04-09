import { useDispatch, useSelector } from "react-redux";

import {
    changePagination,
    searchCountries,
    selectCountries,
} from "../../../store/countries";

import "./styles.css";

export const Header = () => {
    const dispatch = useDispatch();
    const { search } = useSelector(selectCountries);

    const handleChange = (event) => {
        dispatch(searchCountries(event.target.value));
        dispatch(changePagination());
    };

    return (
        <header className="header">
            <input
                type="search"
                placeholder="Buscar pelo nome..."
                value={search}
                onChange={handleChange}
            />
        </header>
    );
};
