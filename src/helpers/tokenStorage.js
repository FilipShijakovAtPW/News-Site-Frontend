let token = null;

export const SET_TOKEN = "SET_TOKEN";

export const SET_TOKEN_IF_PRESENT = "SET_TOKEN_IF_PRESENT";

export const isTokenPresent = () => !!token;

export const setToken = (tokenToStore) => {
    token = tokenToStore;
    localStorage.setItem("jwtToken", token);
};

export const loadToken = () => {
    token = localStorage.getItem("jwtToken");

    return token !== null;
}

export const getToken = () => token;

export const clearToken = () => token = null;