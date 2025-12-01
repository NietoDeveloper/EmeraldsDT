import React, { createContext, useState } from "react";
export const DataContext = createContext(null);

const DataStore = (props) => {
  const [cartValue, setCartValue] = useState(0);
  const [existingCartContext, setExistingCartContext] = useState([]);

  const contextValues = {
    cartValue,
    setCartValue,
    existingCartContext,
    setExistingCartContext,
  };
  return (
    <DataContext.Provider value={contextValues}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataStore;
