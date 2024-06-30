import {
    EDIT_ARTICLE_REQUEST,
    EDIT_ARTICLE_SUCCESS,
    EDIT_ARTICLE_FAILURE,
} from "../../actions/articles";

export const editArticleReducer = (state, action) => {
    switch (action.type) {
        case EDIT_ARTICLE_REQUEST:
            return {
                ...state,
                editArticleStatus: {
                    status: "loading",
                    error: "",
                },
            };
        case EDIT_ARTICLE_SUCCESS:
            const newState = Object.assign({}, state, {
                editArticleStatus: {
                    status: "success",
                    error: "",
                },
            });

            const { articleId, title, content, summary } = action.arg;

            const articleItemInArticles = newState.articles.items.find(
                (article) => article.id === articleId,
            );

            if (articleItemInArticles) {
                articleItemInArticles.title = title;
                articleItemInArticles.content = content;
                articleItemInArticles.summary = summary;
            }

            const articleItemInUserArticles = newState.userArticles.items.find(
                (article) => article.id === articleId,
            );

            if (articleItemInUserArticles) {
                articleItemInUserArticles.title = title;
                articleItemInUserArticles.content = content;
                articleItemInUserArticles.summary = summary;
            }

            return newState;
        case EDIT_ARTICLE_FAILURE:
            return {
                ...state,
                editArticleStatus: {
                    status: "error",
                    error: action.error,
                },
            };
        default:
            return undefined;
    }
};