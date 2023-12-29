import React, { useEffect, useRef, useState } from "react";
import Button from "./button";

export default function Search() {
  //   const helloRef = useRef(0);
  //   const [number, setNumber] = useState(0);
  //   const handleClick = () => {
  //     setNumber(number + 1);

  //     helloRef.current++
  //   };
  const inputRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    console.log(inputRef.current);
    console.log(buttonRef);
  });
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Nhập từ khóa tìm kiếm" />
      <Button ref={buttonRef} />
    </div>
  );
}
