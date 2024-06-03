import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../functions/urlGenerator";

const initialState = {
    articles: {
        items: [],
        hasFetched: false,
    },
    userArticles: {
        items: [],
        hasFetched: false,
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

const getHeaders = ({ token }) => {
    let headers = {};
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
};

export const fetchArticles = createAsyncThunk(
    "articles/fetchArticles",
    async (options) => {
        const { userArticles = false } = options;
        const headers = getHeaders(options);

        let response;

        if (userArticles) {
            response = await axios.get(url("/dashboard/user-article"), {
                headers,
            });
        } else {
            response = await axios.get(url("/dashboard/article"), {
                headers,
            });
        }
        return response.data;
    },
);

export const changePublishedState = createAsyncThunk(
    "articles/publishArticle",
    async (options) => {
        const { articleId } = options;
        const headers = getHeaders(options);

        const response = await axios.get(
            url(`/dashboard/article/${articleId}/change-published-state`),
            { headers },
        );

        return response.data;
    },
);

export const createArticle = createAsyncThunk(
    "articles/createArticle",
    async (options) => {
        const { title, content, summary } = options;
        const headers = getHeaders(options);

        const response = await axios.post(
            url("/dashboard/article"),
            { title, content, summary },
            { headers },
        );

        return response.data;
    },
);

export const editArticle = createAsyncThunk(
    "articles/editArticle",
    async (options) => {
        const { articleId, title, content, summary } = options;
        const headers = getHeaders(options);

        const response = await axios.put(
            url(`/dashboard/article/${articleId}`),
            { title, content, summary },
            { headers },
        );

        return response.data;
    },
);

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        resetStatus(state, action) {
            state[action.payload] = initialState[action.payload];
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticles.pending, (state, action) => {
                const { userArticles } = action.meta.arg;
                if (userArticles) {
                    state.fetchUserArticlesStatus = {
                        status: "loading",
                        error: "",
                    };
                } else {
                    state.fetchArticlesStatus = {
                        status: "loading",
                        error: "",
                    };
                }
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                const { userArticles } = action.meta.arg;
                if (userArticles) {
                    state.fetchUserArticlesStatus = {
                        status: "success",
                        error: "",
                    };
                    state.userArticles = {
                        items: action.payload,
                        hasFetched: true,
                    };
                } else {
                    state.fetchArticlesStatus = {
                        status: "success",
                        error: "",
                    };
                    state.articles = {
                        items: action.payload,
                        hasFetched: true,
                    };
                }
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                const { userArticles } = action.meta.arg;
                if (userArticles) {
                    state.fetchUserArticlesStatus = {
                        status: "error",
                        error: "",
                    };
                } else {
                    state.fetchArticlesStatus = {
                        status: "error",
                        error: "",
                    };
                }
            })
            .addCase(changePublishedState.pending, (state, action) => {
                state.changePublishedArticleStatus = {
                    status: "loading",
                    id: action.meta.arg.articleId,
                    error: "",
                };
            })
            .addCase(changePublishedState.fulfilled, (state, action) => {
                const articleId = action.meta.arg.articleId;
                state.changePublishedArticleStatus = {
                    status: "success",
                    id: articleId,
                    error: "",
                };
                state.articles.items = state.articles.items.map((item) => {
                    if (item.id === articleId) {
                        return {
                            ...item,
                            isPublished: !item.isPublished,
                        };
                    }
                    return item;
                });
            })
            .addCase(changePublishedState.rejected, (state, action) => {
                state.changePublishedArticleStatus = {
                    status: "error",
                    id: action.meta.arg.articleId,
                    error: action.error.message,
                };
            })
            .addCase(createArticle.pending, (state) => {
                state.createArticleStatus = {
                    status: "loading",
                    error: "",
                };
            })
            .addCase(createArticle.fulfilled, (state) => {
                state.createArticleStatus = {
                    status: "success",
                    error: "",
                };
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.createArticleStatus = {
                    status: "error",
                    error: action.error.message,
                };
            })
            .addCase(editArticle.pending, (state) => {
                state.editArticleStatus = {
                    status: "loading",
                    error: "",
                };
            })
            .addCase(editArticle.fulfilled, (state, action) => {
                state.editArticleStatus = {
                    status: "success",
                    error: "",
                };
                const { id, title, content, summary } = action.payload;
                const articleItemInArticles = state.articles.items.find(
                    (article) => article.id === Number(id),
                );
                if (articleItemInArticles) {
                    articleItemInArticles.title = title;
                    articleItemInArticles.content = content;
                    articleItemInArticles.summary = summary;
                }
                const articleItemInUserArticles = state.userArticles.items.find(
                    (article) => article.id === Number(id),
                );
                if (articleItemInUserArticles) {
                    articleItemInUserArticles.title = title;
                    articleItemInUserArticles.content = content;
                    articleItemInUserArticles.summary = summary;
                }
            })
            .addCase(editArticle.rejected, (state, action) => {
                state.editArticleStatus = {
                    status: "error",
                    error: action.error.message,
                };
            });
    },
});

export const selectArticles = (state) => state.articles.articles;

export const selectUserArticles = (state) => state.articles.userArticles;

export const selectSingleArticle = (state, articleId) => [...state.articles.articles.items, ...state.articles.userArticles.items].find(a => a.id === Number(articleId)); 

export const selectFetchArticlesStatus = (state) =>
    state.articles.fetchArticlesStatus;

export const selectFetchUserArticlesStatus = (state) =>
    state.articles.fetchUserArticlesStatus;

export const selectChangePublishedArticleStatus = (state) =>
    state.articles.changePublishedArticleStatus;

export const selectCreateArticleStatus = (state) =>
    state.articles.createArticleStatus;

export const selectEditArticleStatus = (state) =>
    state.articles.editArticleStatus;

export const { resetStatus } = articlesSlice.actions;

export default articlesSlice.reducer;
