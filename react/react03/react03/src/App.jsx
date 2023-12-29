import React, { useState } from "react";
import ComponentsA from "./components/ComponentsA";
import ComponentsB from "./components/ComponentsB";

export const AppContext = React.createContext();

export default function App() {
  const [title, setTitle] = useState("");
  const data = { name: "hoàngan", email: "@", title };
  const handleUpdateTitle = (value) => {
    setTitle(value);
  };
  return (
    <AppContext.Provider value={{ data, handleUpdateTitle }}>
      <ComponentsA />
      <ComponentsB />
    </AppContext.Provider>
  );
}
