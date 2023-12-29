"use client";

import { useDispatch, useSelector } from "react-redux";
import { counterSlice } from "@/redux/slide/couterSlide";

const { increment, decrement } = counterSlice.actions;

export default function CounterPage() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment(1));
  };
  const handleDecrement = () => {
    dispatch(decrement(1));
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}
