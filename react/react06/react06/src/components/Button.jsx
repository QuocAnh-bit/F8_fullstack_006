import React, { forwardRef } from "react";

function Button(props, ref) {
  return <button ref={ref}>Click me</button>;
}
export default forwardRef(Button);
