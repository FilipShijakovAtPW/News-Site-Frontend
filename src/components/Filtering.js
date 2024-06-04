import { useState } from "react";

const AVAILABLE_ORDER_BY_FIELDS = ["title", "summary", "content", "published"];

const extractFilters = (filters) => {
    let searchBy = 1;
    let searchByField = "";
    let orderBy = 1;
    let orderByField = AVAILABLE_ORDER_BY_FIELDS[0];

    if (filters.matches) {
        searchBy = 2;
        searchByField = filters.matches;
    } else if (filters.contains) {
        searchBy = 3;
        searchByField = filters.contains;
    }

    if (filters.orderByAsc) {
        orderBy = 2;
        orderByField = filters.orderByAsc;
    } else if (filters.orderByDesc) {
        orderBy = 3;
        orderByField = filters.orderByDesc;
    }

    return [searchBy, searchByField, orderBy, orderByField];
};

const configureFilters = ({
    searchBy,
    searchByField,
    orderBy,
    orderByField,
}) => {
    let searchFilters = {};
    let orderFilters = {};
    if (searchBy === 2) {
        searchFilters = {
            matches: searchByField,
        };
    } else if (searchBy === 3) {
        searchFilters = {
            contains: searchByField,
        };
    }

    if (orderBy === 2) {
        orderFilters = {
            orderByAsc: orderByField,
        };
    } else if (orderBy === 3) {
        orderFilters = {
            orderByDesc: orderByField,
        };
    }

    return { ...searchFilters, ...orderFilters };
};

export const Filtering = ({ filters = {}, setFilters }) => {
    const [
        searchByInitial,
        searchByFieldInital,
        orderByInitial,
        orderByFieldInitial,
    ] = extractFilters(filters);

    const [searchBy, setSearchBy] = useState(searchByInitial);
    const [searchByField, setSearchByField] = useState(searchByFieldInital);

    const [orderBy, setOrderBy] = useState(orderByInitial);
    const [orderByField, setOrderByField] = useState(orderByFieldInitial);

    const onSetFilters = () => {
        setFilters(
            configureFilters({
                searchBy,
                searchByField,
                orderBy,
                orderByField,
            }),
        );
    };

    return (
        <div
            className="w-50 d-flex justify-content-between"
            style={{
                height: "80px",
            }}
        >
            <div>
                <select
                    className="form-select mb-3"
                    value={searchBy}
                    onChange={(e) => setSearchBy(Number(e.target.value))}
                >
                    <option value={1}>Select search by title</option>
                    <option value={2}>Matches</option>
                    <option value={3}>Contains</option>
                </select>
                {searchBy !== 1 && (
                    <div>
                        <label htmlFor="searchByField" className="me-1">
                            Title:
                        </label>
                        <input
                            id="searchByField"
                            type="text"
                            value={searchByField}
                            onChange={(e) => setSearchByField(e.target.value)}
                        />
                    </div>
                )}
            </div>

            <div>
                <select
                    className="form-select mb-2"
                    value={orderBy}
                    onChange={(e) => setOrderBy(Number(e.target.value))}
                >
                    <option value={1}>Select order by</option>
                    <option value={2}>Ascending</option>
                    <option value={3}>Descending</option>
                </select>
                {orderBy !== 1 && (
                    <select
                        className="form-select"
                        value={orderByField}
                        onChange={(e) => setOrderByField(e.target.value)}
                    >
                        {AVAILABLE_ORDER_BY_FIELDS.map((field) => (
                            <option key={field} value={field}>
                                {field}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div>
                <button className="btn btn-primary" onClick={onSetFilters}>
                    Set Filter
                </button>
            </div>
        </div>
    );
};
