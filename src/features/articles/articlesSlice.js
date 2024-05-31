import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../functions/urlGenerator";

const initialState = {
    items: [],
    fetchStatus: 'idle',
    error: '',
};

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
    const response = await axios.get(url('/article'));
    return response.data;
});

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(fetchArticles.pending, (state) => {
            state.fetchStatus = 'loading';
        })
        .addCase(fetchArticles.fulfilled, (state, action) => {
            state.fetchStatus = 'success';
            state.items = action.payload;
        })
        .addCase(fetchArticles.rejected, (state, action) => {
            state.fetchStatus = 'error';
            console.log('Fetching failed', action);
            state.error = action.error.message;
        })
    }
});

export const selectArticles = (state) => state.articles.items;


export const { articlesLoaded, fetchingArticlesStatusSet } = articlesSlice.actions;

export default articlesSlice.reducer;