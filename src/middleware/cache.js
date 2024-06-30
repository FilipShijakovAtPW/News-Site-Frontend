import objectHash from "object-hash";
import { CALL_API } from "./api";

export const cache = (store) => (next) => (action) => {
    if (!action[CALL_API]) {
        return next(action);
    }

    const { context } = action;

    const { types } = action[CALL_API];

    const successType = types[1];

    const cotnextNameInState = objectHash(context);

    if (store.getState()[cotnextNameInState] && !context.shouldRefresh) {
        return {
            type: successType,
        };
    }

    return next(
        Object.assign({}, action, {
            nameInState: cotnextNameInState,
        }),
    );
};
