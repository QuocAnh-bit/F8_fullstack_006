import React, { useContext } from "react";
import { AppContext } from "../App";
import ComponentC from "./ComponentC";

export default function ComponentsB() {
  const context = useContext(AppContext);
  console.log(context);
  return (
    <div>
      ComponentsB
      <h2>{context.data.title}</h2>
      <ComponentC />
    </div>
  );
}
