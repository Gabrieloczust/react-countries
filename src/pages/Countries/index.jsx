import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import { GET_COUNTRIES } from "../../services/apollo";
import {
    setCountries,
    selectCountries,
    changePagination,
} from "../../store/countries";

import { Header } from "./Header";
import { Card } from "./Card";
import { NoResult } from "./NoResult";
import { Pagination } from "./Pagination";

import { Container } from "../../components/Container";
import { Spinner } from "../../components/Spinner";

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

    if (loading) return <Spinner />;

    return (
        <Container>
            <section id="countries">
                <Header />

                {search.length > 0 && !pagination.countries.length && (
                    <NoResult search={search} />
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
