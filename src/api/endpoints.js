import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const url = (urlPostfix) => `${BASE_URL}${urlPostfix}`;

const ok = (data) => ({
    status: "ok",
    payload: data,
});

const error = (err) => ({
    status: "error",
    payload: err,
});

export const _apiFetchArticles = async () => {
    try {
        const response = await axios.get(url("/article"));

        return ok(response.data);
    } catch (err) {
        console.error(err);

        return error(err);
    }
};
