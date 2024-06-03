import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../functions/urlGenerator";

const initialState = {
    loggedInAs: null,
    users: [],
    loggingInState: "idle",
    fetchUsersState: "idle",
    createUserState: "idle",
    changeRoleState: {
        state: "idle",
        userId: 0,
    },
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

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (options) => {
        const { token } = options;
        let headers = {};

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const request = await axios.get(url("/dashboard/user"), {
            headers,
        });

        return request.data;
    },
);

export const changeUserRole = createAsyncThunk(
    "users/changeRole",
    async (options) => {
        const { token, role, userId, shouldAssign } = options;
        let headers = {};

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        await axios.post(
            url(
                `/dashboard/user/${shouldAssign ? "assign-role" : "remove-role"}`,
            ),
            { role, userId },
            { headers },
        );

        return {
            userId,
            role,
            type: shouldAssign ? "assign" : "remove",
        };
    },
);

export const createUser = createAsyncThunk(
    "users/createUser",
    async (options) => {
        const { token, username, email } = options;
        let headers = {};

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await axios.post(
            url(
                '/dashboard/user/',
            ),
            { username, email },
            { headers },
        );

        return response.data;
    }
)

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
            })
            .addCase(fetchUsers.pending, (state) => {
                state.fetchUsersState = "loading";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.fetchUsersState = "success";
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.fetchUsersState = "error";
                state.error = action.error.message;
            })
            .addCase(changeUserRole.pending, (state, action) => {
                state.changeRoleState = {
                    state: "loading",
                    userId: action.meta.arg.userId,
                };
            })
            .addCase(changeUserRole.fulfilled, (state, action) => {
                state.changeRoleState = {
                    state: "success",
                    userId: action.meta.arg.userId,
                };
                const { userId, role, type } = action.payload;
                const userToChange = state.users.find(
                    (user) => user.id === userId,
                );
                if (type === "assign") {
                    userToChange.roles.push(role);
                } else {
                    userToChange.roles = userToChange.roles.filter(
                        (userRole) => userRole !== role,
                    );
                }
            })
            .addCase(changeUserRole.rejected, (state, action) => {
                state.changeRoleState = {
                    state: "error",
                    userId: action.meta.arg.userId,
                };
                alert(action.error.message);
                state.error = action.error.message;
            })
            .addCase(createUser.pending, (state) => {
                state.createUserState = "loading";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.createUserState = "success";
                alert(action.payload['confirmation-url']);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.fetchUsersState = "error";
                state.error = action.error.message;
            });
    },
});

export const selectLoggedInUser = (state) => state.users.loggedInAs;

export const isUserAdmin = (state) =>
    state.users.loggedInAs?.roles.includes("ROLE_ADMIN");

export const isUserWriter = (state) =>
    state.users.loggedInAs?.roles.includes("ROLE_WRITER");

export const isUserEditor = (state) =>
    state.users.loggedInAs?.roles.includes("ROLE_EDITOR");

export default usersSlice.reducer;
