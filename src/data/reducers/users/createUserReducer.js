import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
} from "../../actions/users";

export const createUserReducer = (state, action) => {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return {
                ...state,
                createUserStatus: {
                    status: "loading",
                    error: "",
                },
            };
        case CREATE_USER_SUCCESS:
            alert(action.payload["confirmation-url"]);
            return {
                ...state,
                createUserStatus: {
                    status: "success",
                    error: "",
                },
            };
        case CREATE_USER_FAILURE:
            return {
                ...state,
                createUserStatus: {
                    status: "error",
                    error: action.error,
                },
            };
        default:
            return undefined;
    }
};