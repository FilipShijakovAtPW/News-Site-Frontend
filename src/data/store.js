// import { configureStore } from "@reduxjs/toolkit";
// import articlesReducer from "../features/articles/articlesSlice";
// import usersReducer from "../features/users/usersSlice";

// const store = configureStore({
//     reducer: {
//         articles: articlesReducer,
//         users: usersReducer,
//     },
// });

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { articlesReducer } from "./reducers/articles/articlesReducer";
import { usersReducer } from "./reducers/users/usersReducer";
import { thunk } from "redux-thunk";
import { api } from "../middleware/api";
import { withEssentialReducers } from "../common/reducers/essentialReducers";
import { cache } from "../middleware/cache";

export const ARTICLES_REDUCERS = "articles";
export const USERS_REDUCER = "users";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const dummyInitialState = {
    counter: 0,
};

const dummyReducer = (state = dummyInitialState, action) => {
    switch (action.type) {
        case "inc":
            return {
                counter: (state.counter += 1),
            };
        case "dec":
            return {
                counter: (state.counter -= 1),
            };
        default:
            return state;
    }
};

const store = createStore(
    combineReducers(withEssentialReducers({
        [ARTICLES_REDUCERS]: articlesReducer,
        [USERS_REDUCER]: usersReducer,
        dummyReducer,
    })),
    composeEnhancers(applyMiddleware(thunk, cache, api)),
);

export default store;
