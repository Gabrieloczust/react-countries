import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import { GET_COUNTRIES } from "../../services/apollo";
import {
    setCountries,
    selectCountries,
    searchCountries,
    changePagination,
} from "../../store/countries";

import { Container } from "../../components/Container";
import { Card } from "../../components/Card";
import { Spinner } from "../../components/Spinner";
import { Pagination } from "../../components/Pagination";

import "./styles.css";

export const Countries = () => {
    document.title = "Countries";
    document.getElementById("favicon").href = "favicon.png";

    const dispatch = useDispatch();
    const { pagination, search } = useSelector(selectCountries);
    const { loading } = useQuery(GET_COUNTRIES, {
        onCompleted: (data) => {
            dispatch(setCountries(data.Country));
            dispatch(changePagination());
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const handleChange = (event) => {
        dispatch(searchCountries(event.target.value));
        dispatch(changePagination());
    };

    if (loading) return <Spinner />;

    return (
        <Container>
            <section id="countries">
                <header className="header">
                    <input
                        type="search"
                        placeholder="Buscar pelo nome..."
                        value={search}
                        onChange={handleChange}
                    />
                </header>

                {search.length > 0 && !pagination.countries.length && (
                    <div>Nenhum resultado para a busca "{search}".</div>
                )}

                <div className="cards">
                    {pagination.countries.map((country) => (
                        <Card
                            key={country._id}
                            name={
                                country.nameClient
                                    ? country.nameClient
                                    : country.name
                            }
                            capital={country.capital}
                            bandeira={country.flag.svgFile}
                            to={"/country/" + country._id}
                        />
                    ))}
                </div>

                <Pagination />
            </section>
        </Container>
    );
};
