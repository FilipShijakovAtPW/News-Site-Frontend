import { CALL_API, NO_NORMALIZATION } from "../../middleware/api";
import { calculateHeaders } from "../../helpers/calculateHeaders";
import * as tokenStorage from "../../helpers/tokenStorage";
import { UserSchema } from "../schemas/users";

export const RESET_USER_STATUS = "RESET_USER_STATUS";
export const SET_TOKEN = "SET_TOKEN";
export const LOGOUT = "LOGOUT";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const CHANGE_USER_ROLE_REQUEST = "CHANGE_USER_ROLE_REQUEST";
export const CHANGE_USER_ROLE_SUCCESS = "CHANGE_USER_ROLE_SUCCESS";
export const CHANGE_USER_ROLE_FAILURE = "CHANGE_USER_ROLE_FAILURE";

export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";

const _login = (username, password) => {
    return {
        [CALL_API]: {
            types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
            options: {
                method: "post",
                headers: {},
                body: {
                    username,
                    password,
                },
            },
            schema: NO_NORMALIZATION,
            endpoint: "/login_check",
        },
        arg: {
            username,
            password,
        },
    };
};

const _fetchUsers = (contextName) => {
    return {
        [CALL_API]: {
            types: [
                FETCH_USERS_REQUEST,
                FETCH_USERS_SUCCESS,
                FETCH_USERS_FAILURE,
            ],
            options: {
                method: "get",
                headers: {
                    Authorization: tokenStorage.SET_TOKEN,
                },
            },
            schema: UserSchema.USER_ARRAY,
            endpoint: "/dashboard/user",
        },
        arg: {
            contextName,
        },
        context: {
            name: contextName,
        },
    };
};

const _changeUserRole = (userId, role, shouldAssign) => {
    return {
        [CALL_API]: {
            types: [
                CHANGE_USER_ROLE_REQUEST,
                CHANGE_USER_ROLE_SUCCESS,
                CHANGE_USER_ROLE_FAILURE,
            ],
            options: {
                method: "post",
                headers: {
                    Authorization: tokenStorage.SET_TOKEN,
                },
                body: {
                    userId,
                    role,
                },
            },
            schema: NO_NORMALIZATION,
            endpoint:
                "/dashboard/user/" +
                (shouldAssign ? "assign-role" : "remove-role"),
        },
        arg: {
            userId,
            role,
            shouldAssign,
        },
    };
};

const _createUser = (username, email) => {
    return {
        [CALL_API]: {
            types: [
                CREATE_USER_REQUEST,
                CREATE_USER_SUCCESS,
                CREATE_USER_FAILURE,
            ],
            options: {
                method: "post",
                headers: {
                    Authorization: tokenStorage.SET_TOKEN,
                },
                body: {
                    username,
                    email,
                },
            },
            schema: NO_NORMALIZATION,
            endpoint: "/dashboard/user/",
        },
        arg: {
            username,
            email,
        },
    };
};

export const login = (options) => (dispatch, getState) =>
    dispatch(_login(options.username, options.password));

export const fetchUsers = (options) => (dispatch, getState) =>
    dispatch(_fetchUsers("fetch-users"));

export const assignRole = (options) => (dispatch, getState) =>
    dispatch(_changeUserRole(options.userId, options.role, true));

export const removeRole = (options) => (dispatch, getState) =>
    dispatch(_changeUserRole(options.userId, options.role, false));

export const createUser = (options) => (dispatch, getState) =>
    dispatch(_createUser(options.username, options.email));

export const resetUserStatus = (area) => 
    ({ type: RESET_USER_STATUS, payload: area });

export const setToken = (username, roles, token) => ({
    type: RESET_USER_STATUS,
    payload: { username, roles, token },
});

export const logout = () => ({ type: LOGOUT });
