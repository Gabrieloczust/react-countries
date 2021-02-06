import React from 'react'
import { useSelector } from 'react-redux'
import { selectCountries } from '../../store/countries'
import { useParams, useHistory, Redirect } from "react-router-dom"
import Container from '../../components/Container'
import List from '../../components/List'
import Button from '../../components/Button'
import './styles.css'

export default function Country() {

    const { countries } = useSelector(selectCountries)
    const { id } = useParams()
    const history = useHistory()

    const country = countries?.find(country =>
        country._id === id
    )

    if (!country) {
        return <Redirect to='/' />
    }

    const handleClick = () => {
        history.push('/')
    }

    return (
        <Container id="country">
            <div className="background" style={{ backgroundImage: `url(${country?.flag?.svgFile})` }}></div>

            <section className="informations">
                <div className="img">
                    <img src={country?.flag?.svgFile} alt="Bandeira" />
                </div>
                <div className="content">
                    <header>
                        <Button type="primary">
                            EDITAR
                        </Button>
                        <Button type="secondary" onClick={handleClick}>
                            VOLTAR
                        </Button>
                    </header>

                    <List
                        list={[
                            {
                                name: 'Nome',
                                value: country?.name
                            },
                            {
                                name: 'Capital',
                                value: country?.capital
                            },
                            {
                                name: 'Área',
                                value: country?.area
                            },
                            {
                                name: 'População',
                                value: country?.population
                            },
                            {
                                name: 'Domínio',
                                value: country?.topLevelDomains[0]?.name
                            },
                        ]}
                    />
                </div>
            </section>
        </Container>
    )
}