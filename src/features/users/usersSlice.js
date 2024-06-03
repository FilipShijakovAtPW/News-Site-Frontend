import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../functions/urlGenerator";

const initialState = {
    loggedInAs: {
        username: "",
        roles: [],
        token: "",
    },
    users: {
        items: [],
        hasFetched: false,
    },
    loginStatus: {
        status: "idle",
        error: "",
    },
    fetchUsersStatus: {
        status: "idle",
        error: "",
    },
    createUserStatus: {
        status: "idle",
        error: "",
    },
    changeRoleStatus: {
        status: "idle",
        userId: 0,
        error: "",
    },
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
            url("/dashboard/user/"),
            { username, email },
            { headers },
        );

        return response.data;
    },
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        resetStatus(state, action) {
            state[action.payload] = initialState[action.payload];
        },
    },
    extraReducers(builder) {
        builder
            .addCase(logIn.pending, (state) => {
                state.loginStatus = {
                    status: "loading",
                    error: "",
                };
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.loginStatus = {
                    status: "success",
                    error: "",
                };
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
                state.loginStatus = {
                    status: "error",
                    error: action.error.message,
                };
            })
            .addCase(fetchUsers.pending, (state) => {
                state.fetchUsersStatus = {
                    status: "loading",
                    error: "",
                };
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.fetchUsersStatus = {
                    status: "success",
                    error: "",
                };
                state.users = {
                    items: action.payload,
                    hasFetched: true,
                };
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.fetchUsersStatus = {
                    status: "error",
                    error: action.error.message,
                };
            })
            .addCase(changeUserRole.pending, (state, action) => {
                state.changeRoleStatus = {
                    status: "loading",
                    userId: action.meta.arg.userId,
                    error: "",
                };
            })
            .addCase(changeUserRole.fulfilled, (state, action) => {
                state.changeRoleStatus = {
                    status: "success",
                    userId: action.meta.arg.userId,
                    error: "",
                };
                const { userId, role, type } = action.payload;
                const userToChange = state.users.items.find(
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
                state.changeRoleStatus = {
                    status: "error",
                    userId: action.meta.arg.userId,
                    error: action.error.message,
                };
            })
            .addCase(createUser.pending, (state) => {
                state.createUserStatus = {
                    status: "loading",
                    error: "",
                };
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.createUserStatus = {
                    status: "success",
                    error: "",
                };
                alert(action.payload["confirmation-url"]);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.createUserStatus = {
                    status: "error",
                    error: action.error.message,
                };
            });
    },
});

export const selectLoggedInUser = (state) => state.users.loggedInAs;

export const selectUsers = (state) => state.users.users;

export const selectLoginStatus = (state) => state.users.loginStatus;

export const selectFetchUsersStatus = (state) => state.users.fetchUsersStatus;

export const selectCreateUserStatus = (state) => state.users.createUserStatus;

export const selectChangeRoleStatus = (state) => state.users.changeRoleStatus;

export const isUserAdmin = (state) =>
    state.users.loggedInAs?.roles.includes("ROLE_ADMIN");

export const isUserWriter = (state) =>
    state.users.loggedInAs?.roles.includes("ROLE_WRITER");

export const isUserEditor = (state) =>
    state.users.loggedInAs?.roles.includes("ROLE_EDITOR");

export const { resetStatus } = usersSlice.actions;

export default usersSlice.reducer;
