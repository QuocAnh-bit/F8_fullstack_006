import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { counterSlice } from "../redux/slice/counterSlice";
const { increment, decrement } = counterSlice.actions;
export default function counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);
  return (
    <div>
      <h1>count: {count}</h1>
      <button
        onClick={() => {
          dispatch(decrement(10));
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          dispatch(increment(10));
        }}
      >
        +
      </button>
    </div>
  );
}
