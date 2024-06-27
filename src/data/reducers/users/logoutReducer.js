import * as token from "../../../helpers/tokenStorage";
import { LOGOUT } from "../../actions/users";
import { initialState } from "./usersReducer";

export const logoutReducer = (state, action) => {
    if (action.type === LOGOUT) {
        token.clearToken();

        return {
            ...state,
            loggedInAs: initialState.loggedInAs,
            loginStatus: initialState.loginStatus,
        };
    }
    return undefined;
};