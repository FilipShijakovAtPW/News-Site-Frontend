const dummyInitialState = {
    dummy: 0,
};

const dummyReducer = (state = dummyInitialState, action) => {
    switch (action.type) {
        case "inc":
            return {
                dummy: (state.dummy += 1),
            };
        case "dec":
            return {
                dummy: (state.dummy -= 1),
            };
        default:
            return state;
    }
};

export const withEssentialReducers = (reducers) => 
    Object.assign({}, {dummyReducer}, reducers);