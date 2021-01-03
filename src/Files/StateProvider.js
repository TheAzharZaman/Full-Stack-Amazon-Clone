import React, { createContext, useContext, useReducer } from "react";

// Initilizing Context by creating it with React.createContext

const CreatedContext = createContext();

// Preparing a whole milky stuff, by creating a wrapper that covers the whole stuff using this Context lateron

const StateProvider = ({ children, reducer, initialState }) => (
  <CreatedContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </CreatedContext.Provider>
);

// Creating a pulling information mechanism by using above created context

const useStateValue = () => {
  return useContext(CreatedContext);
};

export default useStateValue;
export { StateProvider };
