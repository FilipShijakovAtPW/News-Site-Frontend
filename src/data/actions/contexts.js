export const CLEAR_CONTEXT = "CLEAR_CONTEXT";

export const clearContext = (contextName) => 
    ({type: CLEAR_CONTEXT, context: contextName});