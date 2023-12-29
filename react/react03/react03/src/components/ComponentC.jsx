import React, { useContext } from "react";
import { AppContext } from "../App";

export default function ComponentC() {
  const context = useContext(AppContext);
  console.log("a", context);
  return (
    <div>
      <h1>ComponentC</h1>
      <button
        onClick={() => {
          context.handleUpdateTitle("HI");
        }}
      >
        Click me
      </button>
    </div>
  );
}
