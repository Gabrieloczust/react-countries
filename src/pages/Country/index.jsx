import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";

import { openModal } from "../../store/layout";
import { selectCountries, updateCountry } from "../../store/countries";

import { Container } from "../../components/Container";
import { Button } from "../../components/Button";
import { Map } from "./Map";

import "./styles.css";

export const Country = () => {
    const { id } = useParams();
    const history = useHistory();

    const dispatch = useDispatch();
    const { countries } = useSelector(selectCountries);
    const [editable, setEditable] = useState(false);

    const country = countries.find((country) => country._id === id);

    if (!country) return <Redirect to="/" />;

    document.title = country.name;
    document.getElementById("favicon").href = country.flag.svgFile;

    const handleSubmit = (values) => {
        dispatch(updateCountry(values));
        setEditable(false);
    };

    return (
        <>
            <Container id="country">
                <div
                    className="background"
                    style={{
                        backgroundImage: `url(${country.flag.svgFile})`,
                    }}
                ></div>

                <section className="informations">
                    <div className="img">
                        <img src={country?.flag?.svgFile} alt="Bandeira" />
                    </div>

                    <div className="content">
                        <Formik
                            enableReinitialize
                            initialValues={{
                                _id: id,
                                nameClient: country.nameClient
                                    ? country.nameClient
                                    : country.name,
                                capital: country?.capital,
                                area: country?.area,
                                population: country?.population,
                                domain: country?.topLevelDomains[0]?.name,
                            }}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            {() => (
                                <Form>
                                    <header>
                                        {!editable ? (
                                            <>
                                                <Button
                                                    color="primary"
                                                    onClick={() =>
                                                        setEditable(true)
                                                    }
                                                >
                                                    EDITAR
                                                </Button>
                                                <Button
                                                    color="secondary"
                                                    onClick={() =>
                                                        history.push("/")
                                                    }
                                                >
                                                    VOLTAR
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    color="success"
                                                    type="submit"
                                                >
                                                    SALVAR
                                                </Button>
                                                <Button
                                                    color="secondary"
                                                    onClick={() =>
                                                        setEditable(false)
                                                    }
                                                >
                                                    CANCELAR
                                                </Button>
                                            </>
                                        )}
                                    </header>

                                    <ul className="listComponent">
                                        <li>
                                            <b>Nome: </b>
                                            <Field
                                                type="text"
                                                required
                                                name="nameClient"
                                                disabled={!editable}
                                            />
                                        </li>
                                        <li>
                                            <b>Capital: </b>
                                            <Field
                                                type="text"
                                                required
                                                name="capital"
                                                disabled={!editable}
                                            />
                                        </li>
                                        <li>
                                            <b>Área: </b>
                                            <Field
                                                type="number"
                                                required
                                                name="area"
                                                disabled={!editable}
                                            />
                                        </li>
                                        <li>
                                            <b>População: </b>
                                            <Field
                                                type="number"
                                                required
                                                name="population"
                                                disabled={!editable}
                                            />
                                        </li>
                                        <li>
                                            <b>Domínio: </b>
                                            <Field
                                                type="text"
                                                required
                                                name="domain"
                                                disabled={!editable}
                                            />
                                        </li>
                                        <li
                                            className="map-link"
                                            onClick={() =>
                                                dispatch(openModal())
                                            }
                                        >
                                            <small>
                                                Visualizar mapa com o Top 5
                                                Países Proxímos
                                            </small>
                                        </li>
                                    </ul>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </section>
            </Container>

            <Map country={country} />
        </>
    );
};
