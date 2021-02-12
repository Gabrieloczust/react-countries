import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePagination, selectCountries } from '../../store/countries'

import './style.css'

export default function Pagination() {

    const dispatch = useDispatch()
    const { pagination } = useSelector(selectCountries)

    if (pagination.last < 4) {
        return <></>
    }

    function handleClick(page) {
        dispatch(changePagination(page))
    }

    return (
        <div className="pagination">
            <button
                className="prev"
                onClick={() => handleClick(pagination.active === 0 ? pagination.last : pagination.active - 1)}
                title="Página Anterior"
            >
                <img src="/left-arrow.svg" alt="Página Anterior" />
            </button>

            <button
                className="prev"
                onClick={() => handleClick(pagination.active === 0 ? pagination.last : pagination.active - 1)}
            >
                {pagination.active === 0 ? pagination.last : pagination.active}
            </button>

            <button className="active">
                {pagination.active + 1}
            </button>

            <button
                className="next"
                onClick={() => handleClick(pagination.active === pagination.last ? 0 : pagination.active + 1)}
            >
                {pagination.active === pagination.last ? 1 : pagination.active + 2}
            </button>

            <button
                className="next"
                onClick={() => handleClick(pagination.active === pagination.last ? 0 : pagination.active + 1)}
                title="Proxíma Página"
            >
                <img src="/right-arrow.svg" alt="Proxíma Página" />
            </button>
        </div>
    )
}
