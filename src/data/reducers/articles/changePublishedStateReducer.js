import {
    PUBLISH_ARTICLE_REQUEST,
    PUBLISH_ARTICLE_SUCCESS,
    PUBLISH_ARTICLE_FAILURE,
} from "../../actions/articles";

export const changePublishedStateForArticleReducer = (state, action) => {

    switch (action.type) {
        case PUBLISH_ARTICLE_REQUEST:
            return {
                ...state,
                changePublishedArticleStatus: {
                    status: "loading",
                    id: action.arg.articleId,
                    error: "",
                },
            };
        case PUBLISH_ARTICLE_SUCCESS:
            const newState = Object.assign({}, state, {
                changePublishedArticleStatus: {
                    status: "success",
                    id: action.arg.articleId,
                    error: "",
                },
            });
            newState.articles.items = newState.articles.items.map((item) => {
                if (item.id === action.arg.articleId) {
                    return {
                        ...item,
                        isPublished: !item.isPublished,
                    };
                }
                return item;
            });
            return newState;
        case PUBLISH_ARTICLE_FAILURE:
            return {
                ...state,
                changePublishedArticleStatus: {
                    status: "error",
                    id: action.arg.articleId,
                    error: action.error,
                },
            };
        default:
            return undefined;
    }
};
