import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCountries, updateCountryOnClient } from '../../store/countries'
import { selectCountryMap, fetchCountryMap } from '../../store/countryMap'
import { useParams, useHistory, Redirect } from "react-router-dom"
import { Formik, Form, Field } from 'formik'
import { WorldMap } from "react-svg-worldmap"
import Container from '../../components/Container'
import Button from '../../components/Button'
import './styles.css'

export default function Country() {

    const { id } = useParams()
    const history = useHistory()

    const dispatch = useDispatch()
    const { countries } = useSelector(selectCountries)
    const { countryMap, isLoading } = useSelector(selectCountryMap)
    const [editable, setEditable] = useState(false)

    const country = countries?.find(country => country._id === id)

    useEffect(() => {
        dispatch(fetchCountryMap(id, countries))
    }, [dispatch, id, countries])

    if (!country) {
        return <Redirect to='/' />
    }

    function handleSubmit(values) {
        dispatch(updateCountryOnClient(values))
        setEditable(false)
    }

    const stylingFunction = context => {
        return {
            fill: context.country === country.alpha2Code ? "blue" : "green",
            stroke: "green",
            strokeWidth: 1,
            strokeOpacity: 0.2,
            cursor: "pointer",
        }
    }

    const tooltipFunction = (countryName, isoCode, value) => {
        return isoCode === country.alpha2Code
            ? countryName
            : `Distância de ${value}km entre ${countryName} e ${country.name}`
    }

    const handleClickCountry = (event, countryName) => {
        if (countryName !== country.name) {

            const countryId = countries.find(c => c.name === countryName)

            if (countryId?._id) {
                history.push(`/country/${countryId?._id}`);
            }
        }
    }

    return (
        <Container id="country">
            <div className="background" style={{ backgroundImage: `url(${country?.flag?.svgFile})` }}></div>

            <section className="informations">

                <div className="img">
                    <img src={country?.flag?.svgFile} alt="Bandeira" />
                </div>

                <div className="content">

                    <Formik
                        enableReinitialize
                        initialValues={{
                            _id: id,
                            name: country?.name,
                            capital: country?.capital,
                            area: country?.area,
                            population: country?.population,
                            domain: country?.topLevelDomains[0]?.name,
                        }}
                        onSubmit={values => handleSubmit(values)}
                    >
                        {() => (
                            <Form>
                                <header>
                                    {!editable && (
                                        <>
                                            <Button color="primary" onClick={() => setEditable(true)}>
                                                EDITAR
                                            </Button>
                                            <Button color="secondary" onClick={() => history.push('/')}>
                                                VOLTAR
                                            </Button>
                                        </>
                                    )}

                                    {editable && (
                                        <>
                                            <Button color="success" type="submit">
                                                SALVAR
                                            </Button>
                                            <Button color="secondary" onClick={() => setEditable(false)}>
                                                CANCELAR
                                            </Button>
                                        </>
                                    )}
                                </header>

                                <ul className="listComponent" data-testid="list-component">
                                    <li>
                                        <b>Nome: </b>
                                        <Field type="text" required name="name" disabled={!editable} />
                                    </li>
                                    <li>
                                        <b>Capital: </b>
                                        <Field type="text" required name="capital" disabled={!editable} />
                                    </li>
                                    <li>
                                        <b>Área: </b>
                                        <Field type="number" required name="area" disabled={!editable} />
                                    </li>
                                    <li>
                                        <b>População: </b>
                                        <Field type="number" required name="population" disabled={!editable} />
                                    </li>
                                    <li>
                                        <b>Domínio: </b>
                                        <Field type="text" required name="domain" disabled={!editable} />
                                    </li>
                                </ul>
                            </Form>
                        )}
                    </Formik>
                </div>

            </section>

            {!isLoading && (
                <div className="map">
                    <WorldMap
                        title="Top 5 Países Proxímos"
                        color="green"
                        size="responsive"
                        backgroundColor="transparent"
                        data={countryMap}
                        styleFunction={stylingFunction}
                        tooltipTextFunction={tooltipFunction}
                        onClickFunction={handleClickCountry}
                    />
                </div>
            )}
        </Container>
    )
}