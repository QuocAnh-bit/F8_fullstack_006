// import React from "react";
import Header from "./components/Header";

export default function App() {
  const user = {
    name: "Quốc Anh",
    age: "22",
  };
  return (
    <div>
      App
      <Header title="Học lập trình tại f8" {...user} />
    </div>
  );
}
