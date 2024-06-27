export const calculateHeaders = (token) => {
    let headers = {};

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
};
