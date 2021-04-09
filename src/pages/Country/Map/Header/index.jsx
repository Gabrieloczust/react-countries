import PropTypes from "prop-types";
import "./styles.css";

export const WorldMapHeader = ({ onClose }) => (
    <span className="mapTitle">
        Top 5 Países Proxímos
        <span className="close" onClick={onClose}>
            x
        </span>
    </span>
);

WorldMapHeader.propTypes = {
    onClose: PropTypes.func,
};
