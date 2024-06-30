import { normalize } from "normalizr";
import { getFullUrl } from "../helpers/getFullUrl";
import * as token from "../helpers/tokenStorage";

export const CALL_API = "CALL_API";
export const NO_NORMALIZATION = "NO_NORMALIZATION";

export const api = (store) => (next) => (action) => {
    const callApi = action[CALL_API];

    if (typeof callApi === "undefined") {
        return next(action);
    }

    const { endpoint, options, types, schema } = callApi;

    options.headers["Content-Type"] = "application/json";

    if (options.body) {
        options.body = JSON.stringify(options.body);
    }

    if (options.headers["Authorization"] === token.SET_TOKEN) {
        if (!token.isTokenPresent()) {
            throw new Error("Token is not set");
        }
        options.headers["Authorization"] = "Bearer " + token.getToken();
    }

    if (options.headers["Authorization"] === token.SET_TOKEN_IF_PRESENT) {
        if (token.isTokenPresent()) {
            options.headers["Authorization"] = "Bearer " + token.getToken();
        } else {
            delete options.headers["Authorization"];
        }
    }

    if (typeof endpoint !== "string") {
        throw new Error("Specify a string endpoint URL.");
    }

    if (!schema) {
        throw new Error("Specify one of the exported Schemas.");
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error("Expected an array of three action types.");
    }

    if (!types.every((type) => typeof type === "string")) {
        throw new Error("Expected action types to be strings.");
    }

    const [requestType, successType, failureType] = types;
    const __timestamp = Date.now();

    next(actionWith(action, { __timestamp, type: requestType }));

    return doHttpCall(endpoint, options, schema).then(
        createSuccessHandler(
            { ...action, __timestamp, type: successType },
            next,
        ),
        createFailureHandler(
            { ...action, __timestamp, type: failureType },
            next,
        ),
    );
};

const createSuccessHandler = (action, next) => (response) =>
    next(actionWith(action, { response }));

const createFailureHandler = (action, next) => (response) =>
    next(
        actionWith(action, {
            error:
                response.error && response.error.message
                    ? response.error.message
                    : response.message || "Something bad happened",
            errorBag: response || [],
        }),
    );

const actionWith = (action, data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
};

const doHttpCall = (endpoint, options, schema) => {
    const fullUrl = getFullUrl(endpoint);

    const handleJson = (json) => {
        if (schema === NO_NORMALIZATION) {
            return json;
        }

        return normalize(
            digData(json),
            schema
        );
    };

    return fetch(fullUrl, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error while fetching");
            }
            if (response.headers.get("content-type") === "application/json") {
                return response
                    .json()
                    .then((json) => {
                        if (!response.ok) {
                            return Promise.reject(json);
                        }

                        return handleJson(json);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }
            return {};
        })
        .catch((err) => {
            throw new Error("Request failed");
        });
};

const digData = (response) => {
    while (response.data) {
        return digData(response.data);
    }
    return response;
};
