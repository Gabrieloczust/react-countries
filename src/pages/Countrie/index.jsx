import React from 'react'
import { useSelector } from 'react-redux'
import { selectCountries } from '../../store/countries'
import { useParams, useHistory, Redirect } from "react-router-dom"
import Container from '../../components/Container'
import List from '../../components/List'
import Button from '../../components/Button'
import './styles.css'

export default function Countrie() {

  const { id } = useParams()
  const history = useHistory()

  const { countries } = useSelector(selectCountries)
  const countrie = countries.find(countrie => countrie._id === id)

  if (!countrie) {
    return <Redirect to='/' />
  }

  const handleClickBack = () => {
    history.push('/')
  }

  return (
    <Container id="countrie">
      <div className="background" style={{ backgroundImage: `url(${countrie.flag.svgFile})` }}></div>

      <section className="informations">
        <div className="img">
          <img src={countrie.flag.svgFile} alt="Bandeira" />
        </div>
        <div className="content">
          <header>
            <Button type="primary">
              EDITAR
            </Button>
            <Button type="secondary" onClick={handleClickBack}>
              VOLTAR
            </Button>
          </header>

          <List list={[
            {
              name: 'Nome',
              value: countrie.name
            },
            {
              name: 'Capital',
              value: countrie.capital
            },
            {
              name: 'Área',
              value: countrie.area
            },
            {
              name: 'População',
              value: countrie.population
            },
            {
              name: 'Domínio',
              value: countrie.topLevelDomains[0].name
            },
          ]} />
        </div>
      </section>
    </Container>
  )
}