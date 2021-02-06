import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries, selectCountries } from '../../store/countries'
import Container from '../../components/Container'
import Card from '../../components/Card'
import './styles.css'

export default function Countries() {

  const dispatch = useDispatch()
  const { countries, isLoading } = useSelector(selectCountries)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchCountries, setSearchCountries] = useState([])

  function handleChange(event) {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    if(!countries) {
        dispatch(fetchCountries())
    }
  }, [dispatch, countries])

  useEffect(() => {
    const results = searchTerm?.length > 0
      ? countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : countries

    setSearchCountries(results)
  }, [searchTerm, countries])

  return (
    <Container>
        <section id="countries">
            <header className="header">
                <input
                type="search"
                placeholder="Buscar pelo nome..."
                value={searchTerm}
                onChange={handleChange} />
            </header>

            {searchTerm?.length > 0 && searchCountries?.length === 0 && (
                <div>
                    Nenhum resultado para a busca "{searchTerm}".
                </div>
            )}

            {isLoading && (
                <div>
                    Carregando...
                </div>
            )}

            <div className="cards">
                {searchCountries?.length > 0 && searchCountries.map(country => (
                    <Card
                        key={country._id}
                        name={country.name}
                        capital={country.capital}
                        bandeira={country.flag.svgFile}
                        to={'/country/' + country._id}
                    />
                ))}
            </div>

      </section>
    </Container>
  )
}