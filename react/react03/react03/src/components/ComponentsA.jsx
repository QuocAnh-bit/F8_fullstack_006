import React from "react";
import { AppContext } from "../App";

export default function ComponentsA() {
  return (
    <AppContext.Consumer>
      {(context) => {
        console.log(context);
        return (
          <div>
            <h1>ComponentA</h1>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}
