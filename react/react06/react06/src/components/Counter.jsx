import { useState } from "react";
import Content from "./Content";
import { color } from "../libs/color";
const Counter = ({ title }) => {
  const [count, setCount] = useState(0);
  console.log(title);

  return (
    <div>
      <h1>Count: {count} </h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <Content />
    </div>
  );
};

export default color(Counter);
