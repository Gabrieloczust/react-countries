import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCountries, updateCountryOnClient } from '../../store/countries'
import { useParams, useHistory, Redirect } from "react-router-dom"
import { Formik, Form, Field } from 'formik'
import Container from '../../components/Container'
import Button from '../../components/Button'
import './styles.css'

export default function Country() {

    const { countries } = useSelector(selectCountries)

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [editable, setEditable] = useState(false)

    const country = countries?.find(country =>
        country._id === id
    )

    if (!country) {
        return <Redirect to='/' />
    }

    function handleSubmit(values) {
        dispatch(updateCountryOnClient(values))
        setEditable(false)
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
        </Container>
    )
}