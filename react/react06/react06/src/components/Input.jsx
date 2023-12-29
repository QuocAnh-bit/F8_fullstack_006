import React, { useId } from "react";

export default function Input({ title }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{title}</label>
      <input type="text" id={id} placeholder="Nhập đê" />
    </div>
  );
}
