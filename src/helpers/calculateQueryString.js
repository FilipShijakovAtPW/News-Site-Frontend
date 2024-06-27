import queryString from "query-string";

export const calculateQueryString = (options) => {
    const { page = 1, filters = {} } = options;

    return queryString.stringify(
        Object.assign(
            {},
            {
                pageNumber: page,
                ...filters,
            },
        ),
    );
};
