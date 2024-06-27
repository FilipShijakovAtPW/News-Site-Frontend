import { changeUserRoleReducer } from "./changeUserRoleReducer";
import { createUserReducer } from "./createUserReducer";
import { fetchUsersReducer } from "./fetchUsersReducer";
import { loginReducer } from "./loginReducer";
import { logoutReducer } from "./logoutReducer";
import { resetUserStatusReducer } from "./resetUserStatusReducer";
import { setTokenReducer } from "./setTokenReducer";

export const initialState = {
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

export const USER_REDUCERS = 'USER_REDUCERS';

const reducers = [
    changeUserRoleReducer,
    createUserReducer,
    fetchUsersReducer,
    loginReducer,
    logoutReducer,
    resetUserStatusReducer,
    setTokenReducer
]

export const usersReducer = (state = initialState, action) => {
    for (const reducer of reducers) {
        const returnState = reducer(state, action);

        if (returnState) {
            return returnState;
        }
    }

    return state;
};
