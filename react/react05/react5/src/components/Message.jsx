import React from "react";
import { useSelector } from "../core/useSelector";
export default function Message() {
  const { state } = useSelector();
  return (
    <div>
      {state.count >= 10 ? <h3>Kết quả tốt</h3> : <h3>Kết quả không tốt</h3>}
    </div>
  );
}
