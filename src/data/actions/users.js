import { CALL_API } from "../../middleware/api";
import { calculateHeaders } from "../../helpers/calculateHeaders";
import * as tokenStorage from "../../helpers/tokenStorage";

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

const _login = (options) => {
    const { username, password } = options;

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
            schema: null,
            endpoint: "/login_check",
        },
        arg: {
            username,
            password,
        },
    };
};

const _fetchUsers = (options) => {
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
            schema: null,
            endpoint: "/dashboard/user",
        },
    };
};

const _changeUserRole = (options) => {
    const { role, userId, shouldAssign } = options;

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
            schema: null,
            endpoint:
                "/dashboard/user/" +
                (shouldAssign ? "assign-role" : "remove-role"),
        },
        arg: {
            role,
            userId,
            shouldAssign,
        },
    };
};

const _createUser = (options) => {
    const { username, email } = options;

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
            schema: null,
            endpoint: "/dashboard/user/",
        },
        arg: {
            username,
            email,
        },
    };
};

export const login = (options) => (dispatch, getState) =>
    dispatch(_login(options));

export const fetchUsers = (options) => (dispatch, getState) =>
    dispatch(_fetchUsers(options));

export const assignRole = (options) => (dispatch, getState) =>
    dispatch(_changeUserRole({ ...options, shouldAssign: true }));

export const removeRole = (options) => (dispatch, getState) =>
    dispatch(_changeUserRole({ ...options, shouldAssign: false }));

export const createUser = (options) => (dispatch, getState) =>
    dispatch(_createUser(options));

export const resetUserStatus = (area) => (dispatch, getState) =>
    dispatch({ type: RESET_USER_STATUS, payload: area });

export const setToken = (username, roles, token) => (dispatch, getState) =>
    dispatch({ type: RESET_USER_STATUS, payload: { username, roles, token } });

export const logout = () => (dispatch, getState) => dispatch({ type: LOGOUT });
