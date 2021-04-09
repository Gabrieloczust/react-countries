import { useDispatch, useSelector } from "react-redux";
import { changePagination, selectCountries } from "../../store/countries";

import "./style.css";

export const Pagination = () => {
    const dispatch = useDispatch();
    const { pagination } = useSelector(selectCountries);

    const handleChangePage = (page) => {
        if (page > pagination.last) {
            page = 0;
        }

        if (page < 0) {
            page = pagination.last;
        }

        dispatch(changePagination(page));
    };

    if (pagination.last < 1) {
        return <></>;
    }

    return (
        <div className="pagination">
            <button
                className="prev"
                onClick={() => handleChangePage(pagination.active - 1)}
                title="Página Anterior"
            >
                <img src="/left-arrow.svg" alt="Página Anterior" />
            </button>

            <button
                className="prev"
                onClick={() => handleChangePage(pagination.active - 1)}
            >
                {pagination.active === 0
                    ? pagination.last + 1
                    : pagination.active}
            </button>

            <button className="active">{pagination.active + 1}</button>

            <button
                className="next"
                onClick={() => handleChangePage(pagination.active + 1)}
            >
                {pagination.last === pagination.active
                    ? 1
                    : pagination.active + 2}
            </button>

            <button
                className="next"
                onClick={() => handleChangePage(pagination.active + 1)}
                title="Proxíma Página"
            >
                <img src="/right-arrow.svg" alt="Proxíma Página" />
            </button>
        </div>
    );
};
