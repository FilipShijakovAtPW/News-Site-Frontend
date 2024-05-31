import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../functions/urlGenerator";


const initialState = {
    loggedInAs: null,
    users: [],
    loggingInState: 'idle',
    error: '',
};

export const logIn = createAsyncThunk('users/logIn', async ({username, password}) => {
    const request = await axios.post(url('/login_check'), {
        username, password
    });

    return {
        username,
        token: request.data.token,
    };
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(logIn.pending, (state) => {
                state.loggingInState = 'loading';
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.loggingInState = 'success';
                const decodedToken = atob(action.payload.token);
                console.log(decodedToken);
                state.loggedInAs = action.payload;
            })
            .addCase(logIn.rejected, (state, action) => {
                state.loggingInState = 'error';
                state.error = action.error.message;
            })
    }
});

export const getLoggedInUser = (state) => state.users.loggedInAs;

export default usersSlice.reducer;