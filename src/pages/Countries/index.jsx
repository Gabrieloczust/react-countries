import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCountries, fetchCountries, searchCountries, changePagination } from '../../store/countries'
import Container from '../../components/Container'
import Card from '../../components/Card'
import Spinner from '../../components/Spinner'
import Pagination from '../../components/Pagination'

import './styles.css'

export default function Countries() {

  const dispatch = useDispatch()
  const { countries, pagination, isLoading, search } = useSelector(selectCountries)

  document.title = 'Countries'
  document.getElementById("favicon").href = "public/favicon.png"

  function handleChange(event) {
    dispatch(searchCountries(event.target.value))
    dispatch(changePagination())
  }

  useEffect(() => {
    if(!countries) {
        dispatch(fetchCountries())
    }
  }, [dispatch, countries])

  return (
    <Container>
        <section id="countries">
            <header className="header">
                <input
                type="search"
                placeholder="Buscar pelo nome..."
                value={search}
                onChange={handleChange} />
            </header>

            {search.length > 0 && pagination?.countries?.length === 0 && (
                <div>Nenhum resultado para a busca "{search}".</div>
            )}

            {isLoading && <Spinner />}

            {!isLoading && (
              <>
                <div className="cards">
                    {pagination.countries && pagination?.countries.map(country => (
                        <Card
                            key={country._id}
                            name={country.nameClient ? country.nameClient : country.name}
                            capital={country.capital}
                            bandeira={country.flag.svgFile}
                            to={'/country/' + country._id}
                        />
                    ))}
                </div>

                <Pagination />
              </>
            )}
      </section>
    </Container>
  )
}