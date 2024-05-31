import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../functions/urlGenerator";

const initialState = {
    loggedInAs: null,
    users: [],
    loggingInState: "idle",
    error: "",
};

export const logIn = createAsyncThunk(
    "users/logIn",
    async ({ username, password }) => {
        const request = await axios.post(url("/login_check"), {
            username,
            password,
        });

        return request.data;
    },
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(logIn.pending, (state) => {
                state.loggingInState = "loading";
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.loggingInState = "success";
                const encodedTokenInfo = action.payload.token.split(".")[1];

                const decodedTokenInfo = atob(encodedTokenInfo);

                const tokenInfo = JSON.parse(decodedTokenInfo);

                state.loggedInAs = {
                    username: tokenInfo.username,
                    roles: tokenInfo.roles,
                    token: action.payload.token,
                };
            })
            .addCase(logIn.rejected, (state, action) => {
                state.loggingInState = "error";
                state.error = action.error.message;
            });
    },
});

export const selectLoggedInUser = (state) => state.users.loggedInAs;

export const isUserAdmin = (state) => state.users.loggedInAs?.roles.includes('ROLE_ADMIN');

export const isUserWriter = (state) => state.users.loggedInAs?.roles.includes('ROLE_WRITER');

export const isUserEditor = (state) => state.users.loggedInAs?.roles.includes('ROLE_EDITOR');

export default usersSlice.reducer;
