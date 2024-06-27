import {
    CREATE_ARTICLE_REQUEST,
    CREATE_ARTICLE_SUCCESS,
    CREATE_ARTICLE_FAILURE,
} from "../../actions/articles";

export const createArticleReducer = (state, action) => {
    switch (action.type) {
        case CREATE_ARTICLE_REQUEST:
            return {
                ...state,
                createArticleStatus: {
                    status: "loading",
                    error: "",
                },
            };
        case CREATE_ARTICLE_SUCCESS:
            return {
                ...state,
                createArticleStatus: {
                    status: "success",
                    error: "",
                },
            };
        case CREATE_ARTICLE_FAILURE:
            return {
                ...state,
                createArticleStatus: {
                    status: "error",
                    error: action.error,
                },
            };
        default:
            return undefined;
    }
};
