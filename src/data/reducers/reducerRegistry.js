const ARTICLES_REDUCERS = 'ARTICLES_REDUCERS';
const USER_REDUCERS = 'USER_REDUCERS';

const reducerList = {
    [ARTICLES_REDUCERS]: [],
    [USER_REDUCERS]: []
};

export const registerReducer = (name, reducer) => reducerList[name].push(reducer);

export const getReducers = (name) => reducerList[name];
