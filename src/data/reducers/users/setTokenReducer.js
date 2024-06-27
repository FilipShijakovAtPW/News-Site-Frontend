import { extractTokenInfo } from "../../../helpers/extractTokenInfo";
import { setToken } from "../../../helpers/tokenStorage";
import { SET_TOKEN } from "../../actions/users";

export const setTokenReducer = (state, action) => {
    if (action.type === SET_TOKEN) {
        const [username, roles, token] = extractTokenInfo(action.payload);
        setToken(token);

        return {
            ...state,
            loggedInAs: {
                username,
                roles,
                token,
            },
            loginStatus: {
                status: "success",
                error: "",
            },
        };
    }
    return undefined;
};