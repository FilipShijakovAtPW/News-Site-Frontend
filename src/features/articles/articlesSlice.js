import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../functions/urlGenerator";

const initialState = {
    items: [],
    fetchStatus: "idle",
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
            });
    },
});

export const selectArticles = (state) => state.articles.items;
export const selectFetchStatus = (state) => state.articles.fetchStatus;
export const selectError = (state) => state.articles.error;

export default articlesSlice.reducer;
