import React from 'react'
import { useSelector } from 'react-redux'
import { selectCountries } from '../../reducers/countriesSlice'
import { useParams } from "react-router-dom"
import Container from '../../components/Container'
import List from '../../components/List'
import './styles.css'

export default function Countrie() {

  const { value: countries } = useSelector(selectCountries)
  const { id } = useParams()
  const countrie = countries.find(countrie => countrie._id === id)

  return (
    <Container id="countrie">
      <div className="background" style={{ backgroundImage: `url(${countrie.flag.svgFile})` }}></div>

      <div className="list">
        <div className="img">
          <img src={countrie.flag.svgFile} alt="Bandeira" />
        </div>
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
    </Container>
  )
}