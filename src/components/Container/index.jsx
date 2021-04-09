import PropTypes from "prop-types";
import "./styles.css";

export const Container = ({ children, ...props }) => (
    <div className="container" data-testid="container-component" {...props}>
        {children}
    </div>
);

Container.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};
