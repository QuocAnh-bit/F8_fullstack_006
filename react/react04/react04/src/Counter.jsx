import React, { useReducer } from "react";

export default function Counter() {
  /*
    active: Oj
    - type: tên hành động : add, update, increment ...
    - payload: dữ liệ hành động
    
    */
  const reducer = (state, action = {}) => {
    switch (action.type) {
      // type: feature/action
      case "counter/increment": {
        return { ...state, count: state.count + action.payload };
      }
      case "counter/decrement": {
        return { ...state, count: state.count - action.payload };
      }
      default: {
        return state;
      }
    }
  };
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const handleIncrement = () => {
    dispatch({ type: "counter/increment", payload: 2 });
  };
  const handleDecrement = () => {
    dispatch({ type: "counter/decrement", payload: 3 });
  };
  return (
    <div>
      <h1>Counter: {state.count} </h1>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}
/*reduce
useState
Context , closure

Build Store state sử dụng useReducer + react context

- action
- action Creator
- selector
- dispatch
- callApi -> setState bằng useReducer -> thông qua middleware -
*/
