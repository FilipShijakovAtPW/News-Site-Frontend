import { RESET_USER_STATUS } from "../../actions/users";
import { initialState } from "./usersReducer";

export const resetUserStatusReducer = (state, action) => {
    if (action.type === RESET_USER_STATUS) {
        const newState = Object.assign({}, state);

        newState[action.payload] = initialState[action.payload];

        return newState;
    }
}