import {
    CHANGE_USER_ROLE_REQUEST,
    CHANGE_USER_ROLE_SUCCESS,
    CHANGE_USER_ROLE_FAILURE,
} from "../../actions/users";

export const changeUserRoleReducer = (state, action) => {
    switch (action.type) {
        case CHANGE_USER_ROLE_REQUEST:
            return {
                ...state,
                changeRoleStatus: {
                    status: "loading",
                    userId: action.arg.userId,
                    error: "",
                },
            };
        case CHANGE_USER_ROLE_SUCCESS:
            const newState = Object.assign({}, state);

            newState.changeRoleStatus = {
                status: "success",
                userId: action.arg.userId,
                error: "",
            };

            const { userId, role, shouldAssign } = action.arg;

            const userToChange = newState.users.items.find(
                (user) => user.id === userId,
            );

            if (shouldAssign) {
                if (!userToChange.roles.includes(role)) {
                    userToChange.roles.push(role);
                }
            } else {
                userToChange.roles = userToChange.roles.filter(
                    (userRole) => userRole !== role,
                );
            }

            return newState;
        case CHANGE_USER_ROLE_FAILURE:
            return {
                ...state,
                changeRoleStatus: {
                    status: "error",
                    userId: action.arg.userId,
                    error: action.error,
                },
            };
        default:
            return undefined;
    }
};