import {
    FETCH_USER_ARTICLES_REQUEST,
    FETCH_USER_ARTICLES_SUCCESS,
    FETCH_USER_ARTICLES_FAILURE,
} from "../../actions/articles";

export const fetchUserArticlesReducer = (state, action) => {
    switch (action.type) {
        case FETCH_USER_ARTICLES_REQUEST:
            return {
                ...state,
                fetchUserArticlesStatus: {
                    status: "loading",
                    error: "",
                },
            };
        case FETCH_USER_ARTICLES_SUCCESS:
            const { page, filters } = action.arg;
            return {
                ...state,
                fetchUserArticlesStatus: {
                    status: "success",
                    error: "",
                },
                userArticles: {
                    items: action.payload,
                    hasFetched: true,
                    page,
                    filters,
                },
            };
        case FETCH_USER_ARTICLES_FAILURE:
            return {
                ...state,
                fetchUserArticlesStatus: {
                    status: "error",
                    error: action.error,
                },
            };
        default:
            return undefined;
    }
};
