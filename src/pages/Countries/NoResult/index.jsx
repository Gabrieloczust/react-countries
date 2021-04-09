import PropTypes from "prop-types";

export const NoResult = ({ search }) => (
    <div>Nenhum resultado para a busca "{search}".</div>
);

NoResult.propTypes = {
    search: PropTypes.string,
};
