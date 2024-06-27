import {
    changePublishedStateForArticleReducer,
    createArticleReducer,
    editArticleReducer,
    fetchArticlesReducer,
    fetchUserArticlesReducer,
    resetArticlesStatusReducer,
} from "./";

export const initialState = {
    articles: {
        items: [],
        hasFetched: false,
        page: 0,
        filters: {},
    },
    userArticles: {
        items: [],
        hasFetched: false,
        page: 0,
        filters: {},
    },
    fetchArticlesStatus: {
        status: "idle",
        error: "",
    },
    fetchUserArticlesStatus: {
        status: "idle",
        error: "",
    },
    changePublishedArticleStatus: {
        id: 0,
        status: "idle",
        error: "",
    },
    createArticleStatus: {
        status: "idle",
        error: "",
    },
    editArticleStatus: {
        status: "idle",
        error: "",
    },
};

const reducers = [
    changePublishedStateForArticleReducer,
    createArticleReducer,
    editArticleReducer,
    fetchArticlesReducer,
    fetchUserArticlesReducer,
    resetArticlesStatusReducer,
]

export const articlesReducer = (state = initialState, action) => {


    for (const reducer of reducers) {
        const returnState = reducer(state, action);

        if (returnState) {
            return returnState;
        }
    }

    return state;
};
