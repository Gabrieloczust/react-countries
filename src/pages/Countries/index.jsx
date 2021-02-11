import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries, selectCountries } from '../../store/countries'
import Container from '../../components/Container'
import Card from '../../components/Card'
import './styles.css'
import Spinner from '../../components/Spinner'

export default function Countries() {

  const dispatch = useDispatch()
  const { countries, isLoading } = useSelector(selectCountries)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchCountries, setSearchCountries] = useState([])

  document.title = 'Countries'
  document.getElementById("favicon").href = "public/favicon.png"

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
      ? countries.filter(country => {
        if (country.nameClient) {
          return country.nameClient.toLowerCase().includes(searchTerm.toLowerCase())
        }

        return country.name.toLowerCase().includes(searchTerm.toLowerCase())
      })
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

            {isLoading && <Spinner />}

            <div className="cards">
                {searchCountries?.length > 0 && searchCountries.map(country => (
                    <Card
                        key={country._id}
                        name={country.nameClient ? country.nameClient : country.name}
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