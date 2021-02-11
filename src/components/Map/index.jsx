import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import Modal from 'react-modal'
import { WorldMap } from "react-svg-worldmap"
import { selectCountryMap } from '../../store/countryMap'
import { selectCountries } from '../../store/countries'
import { closeModal } from '../../store/layout'

import './styles.css'

Modal.setAppElement('#root')

export default function Map({ country }) {

    const history = useHistory()
    const dispatch = useDispatch()
    const { countryMap, isLoading } = useSelector(selectCountryMap)
    const { countries } = useSelector(selectCountries)
    const modal = useSelector(state => state.layout.modal)

    const stylingFunction = context => ({
        fill: context.country === country.alpha2Code ? "blue" : "green",
        stroke: "black",
        strokeWidth: 2,
        strokeOpacity: 1,
        cursor: context.country === country.alpha2Code ? "auto" : "pointer",
    })

    const tooltipFunction = (countryName, isoCode, value) => isoCode === country.alpha2Code
        ? countryName
        : `Distância de ${value}km entre ${countryName} e ${country.name}`

    const handleClickCountry = (event, countryName) => {
        if (countryName !== country.name) {
            const countryId = countries.find(c => c.name === countryName)

            if (countryId?._id) {
                dispatch(closeModal())
                history.push(`/country/${countryId?._id}`);
            }
        }
    }

    const WorldMapHeader = () => (
        <div className="mapTitle">
            Top 5 Países Proxímos
            <div className="close" onClick={() => dispatch(closeModal())}>x</div>
        </div>
    )

    return (
        <>
            <Modal
                isOpen={modal.open}
                contentLabel={modal.title}
                className="modal"
                overlayClassName="modalOverlay"
            >
                {!isLoading && (
                    <div className="map">
                        <WorldMap
                            title={<WorldMapHeader />}
                            color="green"
                            size="xl"
                            backgroundColor="transparent"
                            data={countryMap}
                            styleFunction={stylingFunction}
                            tooltipTextFunction={tooltipFunction}
                            onClickFunction={handleClickCountry}
                        />
                    </div>
                )}

                {isLoading && (
                    <div>Carregando...</div>
                )}
            </Modal>
        </>
    )
}
