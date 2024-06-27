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

export const ARTICLES_REDUCERS = "articles";
export const USERS_REDUCER = "users";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        [ARTICLES_REDUCERS]: articlesReducer,
        [USERS_REDUCER]: usersReducer,
    }),
    composeEnhancers(applyMiddleware(thunk, api)),
);

export default store;
