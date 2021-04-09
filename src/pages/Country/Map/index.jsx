import PropTypes from "prop-types";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { WorldMap } from "react-svg-worldmap";
import Modal from "react-modal";

import { GET_COUNTRY_MAP } from "../../../services/apollo";
import { selectCountries } from "../../../store/countries";
import { closeModal } from "../../../store/layout";

import { WorldMapHeader } from "./Header";
import { Spinner } from "../../../components/Spinner";
import "./styles.css";

Modal.setAppElement("#root");

export const Map = ({ country }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [worldMapCountry, setWorldMapCountry] = useState([]);
    const { countries } = useSelector(selectCountries);
    const modal = useSelector((state) => state.layout.modal);

    const { loading } = useQuery(GET_COUNTRY_MAP, {
        variables: {
            id: country._id,
        },
        onError: (error) => {
            console.error(error);
        },
        onCompleted: ({ Country: [Country] }) => {
            const distanceToOtherCountries = Country.distanceToOtherCountries;
            const worldMapData = distanceToOtherCountries.map((country) => {
                const countryFind = countries.find(
                    (c) => c.name === country.countryName
                );

                return {
                    country: countryFind.alpha2Code.toLowerCase(),
                    value: country.distanceInKm.toFixed(2),
                };
            });

            const valueTotal = worldMapData
                .reduce((prevVal, element) => {
                    return prevVal + parseInt(element.value);
                }, 500)
                .toFixed(2)
                .toString();

            setWorldMapCountry([
                ...worldMapData,
                {
                    country: Country.alpha2Code.toLowerCase(),
                    value: valueTotal,
                },
            ]);
        },
    });

    const stylingFunction = (context) => ({
        fill: context.country === country.alpha2Code ? "blue" : "green",
        stroke: "black",
        strokeWidth: 2,
        strokeOpacity: 1,
        cursor: context.country === country.alpha2Code ? "auto" : "pointer",
    });

    const tooltipFunction = (countryName, isoCode, value) =>
        isoCode === country.alpha2Code
            ? countryName
            : `Distância de ${value}km entre ${countryName} e ${country.name}`;

    const handleClickCountry = (event, countryName) => {
        if (countryName !== country.name) {
            const countryId = countries.find((c) => c.name === countryName);

            if (countryId?._id) {
                dispatch(closeModal());
                history.push(`/country/${countryId?._id}`);
            }
        }
    };

    return (
        <Modal
            isOpen={modal.open}
            contentLabel={modal.title}
            className="modal"
            overlayClassName="modalOverlay"
        >
            {!loading ? (
                <div className="map">
                    <WorldMap
                        title={
                            <WorldMapHeader
                                onClose={() => dispatch(closeModal())}
                            />
                        }
                        color="green"
                        size="xl"
                        backgroundColor="transparent"
                        data={worldMapCountry}
                        styleFunction={stylingFunction}
                        tooltipTextFunction={tooltipFunction}
                        onClickFunction={handleClickCountry}
                    />
                </div>
            ) : (
                <Spinner />
            )}
        </Modal>
    );
};

Map.propTypes = {
    country: PropTypes.object,
};
