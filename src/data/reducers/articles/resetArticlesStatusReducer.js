import { RESET_ARTICLES_STATUS } from "../../actions/articles";
import { initialState } from "./articlesReducer";


export const resetArticlesStatusReducer = (state, action) => {
    if (action.type === RESET_ARTICLES_STATUS) {
        const newState = Object.assign({}, state);

        newState[action.payload] = initialState[action.payload];

        return newState;
    }
};
