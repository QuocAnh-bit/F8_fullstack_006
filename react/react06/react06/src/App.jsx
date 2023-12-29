import React from "react";
import Input from "./components/input";
import Counter from "./components/Counter";
import Search from "./components/Search";
import Counter2 from "./components/Counter2";

export default function App() {
  return (
    <div>
      <h1>useLayoutEffect</h1>
      {/* <Counter title="HIhohoh" /> */}
      <Input title={"Tên"} />
      <Input title={"email"} />
    </div>
  );
}
