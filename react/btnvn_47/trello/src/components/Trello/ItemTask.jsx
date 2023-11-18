import React from "react";

export default function ItemTask({ content }) {
  console.log(content);
  return (
    <div className="item-cart">
      <p>{content}</p>
    </div>
  );
}
