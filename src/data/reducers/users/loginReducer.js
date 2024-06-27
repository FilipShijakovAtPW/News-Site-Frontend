import { extractTokenInfo } from "../../../helpers/extractTokenInfo";
import { setToken } from "../../../helpers/tokenStorage";
import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
} from "../../actions/users";

export const loginReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loginStatus: {
                    status: "loading",
                    error: "",
                },
            };
        case LOGIN_SUCCESS:
            const newState = Object.assign({}, state, {
                loginStatus: {
                    status: "success",
                    error: "",
                },
            });

            const [username, roles, token] = extractTokenInfo(
                action.payload.token,
            );

            setToken(token);

            newState.loggedInAs = {
                username,
                roles,
                token,
            };
            return newState;
        case LOGIN_FAILURE:
            return {
                ...state,
                loginStatus: {
                    status: "error",
                    error: action.error,
                },
            };
        default:
            return undefined;
    }
};