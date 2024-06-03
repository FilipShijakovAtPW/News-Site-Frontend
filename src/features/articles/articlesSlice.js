import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../functions/urlGenerator";

const initialState = {
    items: [],
    fetchStatus: "idle",
    changePublishStateStatus: {
        id: 0,
        state: "idle",
    },
    createArticleState: "idle",
    editArticleState: "idle",
    error: "",
};

export const fetchArticles = createAsyncThunk(
    "articles/fetchArticles",
    async (options) => {
        const { token, userArticles = false } = options;
        let headers = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

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
        const { token, articleId } = options;
        let headers = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

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
        const { token, title, content, summary } = options;
        let headers = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

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
        const { token, articleId, title, content, summary } = options;
        let headers = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

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
    extraReducers(builder) {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.fetchStatus = "loading";
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.fetchStatus = "success";
                state.items = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.fetchStatus = "error";
                state.error = action.error.message;
            })
            .addCase(changePublishedState.pending, (state, action) => {
                state.changePublishStateStatus = {
                    state: "loading",
                    id: action.meta.arg.articleId,
                };
            })
            .addCase(changePublishedState.fulfilled, (state, action) => {
                const articleId = action.meta.arg.articleId;
                state.changePublishStateStatus.state = {
                    state: "success",
                    id: articleId,
                };
                state.items = state.items.map((item) => {
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
                state.changePublishStateStatus.state = {
                    state: "error",
                    id: action.meta.arg.articleId,
                };
                state.error = action.error.message;
            })
            .addCase(createArticle.pending, (state) => {
                state.createArticleState = "loading";
            })
            .addCase(createArticle.fulfilled, (state) => {
                state.createArticleState = "success";
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.createArticleState = "error";
                state.error = action.error.message;
            })
            .addCase(editArticle.pending, (state) => {
                state.editArticleState = "loading";
            })
            .addCase(editArticle.fulfilled, (state, action) => {
                state.editArticleState = "success";
                const {id, title, content, summary} = action.payload;
                let articleItem = state.items.find(article => article.id === id);
                articleItem.title = title;
                articleItem.content = content;
                articleItem.summary = summary;
            })
            .addCase(editArticle.rejected, (state, action) => {
                state.editArticleState = "error";
                state.error = action.error.message;
            });
    },
});

export const selectArticles = (state) => state.articles.items;
export const selectFetchStatus = (state) => state.articles.fetchStatus;
export const selectError = (state) => state.articles.error;

export default articlesSlice.reducer;
