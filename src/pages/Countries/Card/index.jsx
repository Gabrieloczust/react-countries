import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectCountries } from "../../../store/countries";

import "./styles.css";

export const Card = ({ to, name, capital, bandeira }) => {
    const { search } = useSelector(selectCountries);

    if (search.length && name.toLowerCase().includes(search.toLowerCase())) {
        const nameWithSearch = name
            .toLowerCase()
            .replace(
                search.toLowerCase(),
                `<span>${search.toLowerCase()}</span>`
            );

        name =
            nameWithSearch.charAt(0) !== "<"
                ? nameWithSearch.charAt(0).toUpperCase() +
                  nameWithSearch.slice(1)
                : nameWithSearch.slice(0, 6) +
                  nameWithSearch.charAt(6).toUpperCase() +
                  nameWithSearch.slice(7);
    }

    return (
        <Link
            className="card"
            title={name}
            to={to}
            data-testid="card-component"
        >
            <div
                className="background"
                style={{ backgroundImage: `url(${bandeira})` }}
            ></div>

            <div className="content">
                <h4 dangerouslySetInnerHTML={{ __html: name }}></h4>
                <h6>Capital: {capital}</h6>
            </div>
        </Link>
    );
};
