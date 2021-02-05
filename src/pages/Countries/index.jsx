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
    dispatch(fetchCountries())
  }, [dispatch])

  useEffect(() => {
    const results = searchTerm?.length > 0
      ? countries.filter(countrie =>
        countrie.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : countries

    setSearchCountries(results)
  }, [searchTerm, countries])

  return (
    <Container>
      <header className="header">
        <input
          type="search"
          placeholder="Buscar pelo nome..."
          value={searchTerm}
          onChange={handleChange} />
      </header>

      {searchCountries?.length > 0 && searchCountries.map(countrie => (
        <Card
          key={countrie._id}
          name={countrie.name}
          capital={countrie.capital}
          bandeira={countrie.flag.svgFile}
          to={'/countrie/' + countrie._id}
        />
      ))}

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
    </Container>
  )
}