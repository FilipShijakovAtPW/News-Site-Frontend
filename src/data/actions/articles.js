import { CALL_API, NO_NORMALIZATION } from "../../middleware/api";
import { calculateQueryString } from "../../helpers/calculateQueryString";
import { SET_TOKEN, SET_TOKEN_IF_PRESENT } from "../../helpers/tokenStorage";
import { ArticleSchema } from "../schemas/articles";

export const RESET_ARTICLES_STATUS = "RESET_ARTICLES_STATUS";

export const FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST";
export const FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS";
export const FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE";

export const FETCH_USER_ARTICLES_REQUEST = "FETCH_USER_ARTICLES_REQUEST";
export const FETCH_USER_ARTICLES_SUCCESS = "FETCH_USER_ARTICLES_SUCCESS";
export const FETCH_USER_ARTICLES_FAILURE = "FETCH_USER_ARTICLES_FAILURE";

export const PUBLISH_ARTICLE_REQUEST = "PUBLISH_ARTICLE_REQUEST";
export const PUBLISH_ARTICLE_SUCCESS = "PUBLISH_ARTICLE_SUCCESS";
export const PUBLISH_ARTICLE_FAILURE = "PUBLISH_ARTICLE_FAILURE";

export const CREATE_ARTICLE_REQUEST = "CREATE_ARTICLE_REQUEST";
export const CREATE_ARTICLE_SUCCESS = "CREATE_ARTICLE_SUCCESS";
export const CREATE_ARTICLE_FAILURE = "CREATE_ARTICLE_FAILURE";

export const EDIT_ARTICLE_REQUEST = "EDIT_ARTICLE_REQUEST";
export const EDIT_ARTICLE_SUCCESS = "EDIT_ARTICLE_SUCCESS";
export const EDIT_ARTICLE_FAILURE = "EDIT_ARTICLE_FAILURE";

const _fetchArticles = (contextName, options) => {
    const requestQueryString = calculateQueryString(options);

    return {
        [CALL_API]: {
            types: [
                FETCH_ARTICLES_REQUEST,
                FETCH_ARTICLES_SUCCESS,
                FETCH_ARTICLES_FAILURE,
            ],
            options: {
                method: "get",
                headers: {
                    Authorization: SET_TOKEN_IF_PRESENT,
                },
            },
            schema: ArticleSchema.ARTICLE_ARRAY,
            endpoint: "/dashboard/article?" + requestQueryString,
        },
        arg: {
            contextName,
            ...options,
        },
        context: {
            name: contextName,
            page: options.page,
            filters: options.filters,
        },
    };
};

const _fetchUserArticles = (contextName, options) => {
    const requestQueryString = calculateQueryString(options);

    return {
        [CALL_API]: {
            types: [
                FETCH_USER_ARTICLES_REQUEST,
                FETCH_USER_ARTICLES_SUCCESS,
                FETCH_USER_ARTICLES_FAILURE,
            ],
            options: {
                method: "get",
                headers: {
                    Authorization: SET_TOKEN,
                },
            },
            schema: ArticleSchema.ARTICLE_ARRAY,
            endpoint: "/dashboard/user-article?" + requestQueryString,
        },
        arg: {
            contextName,
            ...options,
        },
        context: {
            name: contextName,
            page: options.page,
            filters: options.filters,
        },
    };
};

const _publishArticle = (articleId) => {
    return {
        [CALL_API]: {
            types: [
                PUBLISH_ARTICLE_REQUEST,
                PUBLISH_ARTICLE_SUCCESS,
                PUBLISH_ARTICLE_FAILURE,
            ],
            options: {
                method: "get",
                headers: {
                    Authorization: SET_TOKEN,
                },
            },
            schema: NO_NORMALIZATION,
            endpoint: `/dashboard/article/${articleId}/change-published-state`,
        },
        arg: {
            articleId,
        },
    };
};

const _createArticle = (title, content, summary) => {
    return {
        [CALL_API]: {
            types: [
                CREATE_ARTICLE_REQUEST,
                CREATE_ARTICLE_SUCCESS,
                CREATE_ARTICLE_FAILURE,
            ],
            options: {
                method: "post",
                headers: {
                    Authorization: SET_TOKEN,
                },
                body: {
                    title,
                    content,
                    summary,
                },
            },
            schema: NO_NORMALIZATION,
            endpoint: "/dashboard/article",
        },
        arg: {
            title,
            content,
            summary,
        },
    };
};

const _editArticle = (articleId, title, content, summary) => {
    return {
        [CALL_API]: {
            types: [
                EDIT_ARTICLE_REQUEST,
                EDIT_ARTICLE_SUCCESS,
                EDIT_ARTICLE_FAILURE,
            ],
            options: {
                method: "put",
                headers: {
                    Authorization: SET_TOKEN,
                },
                body: {
                    title,
                    content,
                    summary,
                },
            },
            schema: ArticleSchema.ARTICLE,
            endpoint: `/dashboard/article/${articleId}`,
        },
        arg: {
            articleId,
            title,
            content,
            summary,
        },
    };
};

export const fetchArticles =
    ({ page = 1, filters = {} }) =>
    (dispatch, getState) =>
        dispatch(_fetchArticles("fetch-articles", { page, filters }));

export const fetchUserArticles =
    ({ page = 1, filters = {} }) =>
    (dispatch, getState) =>
        dispatch(_fetchUserArticles("fetch-user-articles", { page, filters }));

export const publishArticle = (options) => (dispatch, getState) =>
    dispatch(_publishArticle(options.articleId));

export const createArticle = (options) => (dispatch, getState) =>
    dispatch(_createArticle(options.title, options.content, options.summary));

export const editArticle = (options) => (dispatch, getState) =>
    dispatch(
        _editArticle(
            options.articleId,
            options.title,
            options.content,
            options.summary,
        ),
    );

export const resetArticlesStatus = (area) =>
    ({ type: RESET_ARTICLES_STATUS, payload: area });
