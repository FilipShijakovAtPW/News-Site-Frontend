import {
    FETCH_ARTICLES_FAILURE,
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
} from "../../actions/articles";

export const fetchArticlesReducer = (state, action) => {
    switch (action.type) {
        case FETCH_ARTICLES_REQUEST:
            return {
                ...state,
                fetchArticlesStatus: {
                    status: "loading",
                    error: "",
                },
            };
        case FETCH_ARTICLES_SUCCESS:
            const { page, filters } = action.arg;
            const items = action.payload.map((article) => {
                if (article.isPublished) {
                    return {
                        ...article,
                        isPublished: article.isPublished.isPublished,
                    };
                }
                return {...article, isPublished: true};
            });
            return {
                ...state,
                fetchArticlesStatus: {
                    status: "success",
                    error: "",
                },
                articles: {
                    items,
                    hasFetched: true,
                    page,
                    filters,
                },
            };
        case FETCH_ARTICLES_FAILURE:
            return {
                ...state,
                fetchArticlesStatus: {
                    status: "error",
                    error: action.error,
                },
            };
        default:
            return undefined;
    }
};
