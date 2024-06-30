import { CLEAR_CONTEXT } from "../../data/actions/contexts";

export const contexts = (state = {}, action) => {
    if (action.context && action.response && action.response.entities) {
        // if the action was started before the latest, don't update the state
        const contextName = action.context.nameInState
        if (
            action.__timestamp &&
            state[contextName] &&
            state[contextName].timestamp &&
            action.__timestamp <= state[contextName].timestamp
        ) {
            return state;
        }
        let addition = {};
        let resultChanged = action.response.result;

        addition[contextName] = {
            result: resultChanged,
            pagination: action.response.pagination,
            timestamp: action.__timestamp,
        };
        return Object.assign({}, state, addition);
    }
    if (action.type === CLEAR_CONTEXT) {
        const newState = Object.assign({}, state);
        delete newState[action.context];
        return newState;
    }
    return state;
};