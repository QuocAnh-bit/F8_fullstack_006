import React, { useLayoutEffect, useRef } from "react";
import { useSelector } from "../core/useSelector";
import MAX_TURN from "../config/config";
import "../assets/Content.css";
export default function Content() {
  const { state, dispatch } = useSelector();
  const hrRef = useRef();

  useLayoutEffect(() => {
    const rate = (state.countTurn * 100) / MAX_TURN;
    hrRef.current.style.width = rate + `%`;
  }, [state.countTurn]);
  return (
    <div className="wrap-content">
      <hr ref={hrRef} />
      <h2 className="title-content">{state.message}</h2>
      <h2 className="number-turns">Còn {state.countTurn}/7 lần</h2>
      <h2 className="suggest">Bạn cần nhập 1 số từ đến 99</h2>
    </div>
  );
}
