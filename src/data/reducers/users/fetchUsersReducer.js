import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
} from "../../actions/users";

export const fetchUsersReducer = (state, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                fetchUsersStatus: {
                    status: "loading",
                    error: "",
                },
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                fetchUsersStatus: {
                    status: "success",
                    error: "",
                },
                users: {
                    items: action.payload,
                    hasFetched: true,
                },
            };
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                fetchUsersStatus: {
                    status: "error",
                    error: action.error,
                },
            };
        default:
            return undefined;
    }
};