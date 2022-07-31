import React, { useState } from "react";

const UiContext = React.createContext({
  updateFromDataBase: true,
  toggleUpdate: (value) => {},
});

export const UiContextProvider = (props) => {
  const [updateFromDataBase, setUpdateFromDataBase] = useState(true);

  const toggleUpdate = (value) => {
    setUpdateFromDataBase(value);
  };

  const uiObject = {
    updateFromDataBase,
    toggleUpdate,
  };
  return (
    <UiContext.Provider value={uiObject}>{props.children}</UiContext.Provider>
  );
};
export default UiContext;
