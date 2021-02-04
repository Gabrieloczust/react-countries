import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries, selectCountries } from './reducers/countriesSlice'
import Container from './components/Container'
import Card from './components/Card'

export default function App() {

  const dispatch = useDispatch()
  const { value: countries } = useSelector(selectCountries)

  async function asyncFetchCountries() {
    await dispatch(fetchCountries())
  }

  useEffect(() => {
    asyncFetchCountries()
  })

  return (
    <Container>
      {countries.map((countrie, index) => (
        <Card
          key={index.toString()}
          name={countrie.name}
          capital={countrie.capital}
          bandeira={countrie.flag.svgFile}
        />
      ))}
    </Container>
  )
}