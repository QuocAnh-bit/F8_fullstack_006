import React from "react";
import { useSelector } from "../core/useSelector";
export default function Counter() {
  const { state, dispatch } = useSelector();
  const handelIncrement = () => {
    dispatch({
      type: "counter/increment",
    });
  };
  const handelDecrement = () => {
    dispatch({
      type: "counter/decrement",
    });
  };
  console.log(state, dispatch);

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={handelDecrement}>-</button>
      <button onClick={handelIncrement}>+</button>
    </div>
  );
}
