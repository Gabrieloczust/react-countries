import "./styles.css";

export const WorldMapHeader = ({ onClose }) => (
    <div className="mapTitle">
        Top 5 Países Proxímos
        <div className="close" onClick={onClose}>
            x
        </div>
    </div>
);
