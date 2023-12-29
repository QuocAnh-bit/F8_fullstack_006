"use client";

import { useState } from "react";

export default function PostDetail({ title, body }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div>
        <h1>{title}</h1>
        {show ? <p>{body}</p> : ""}
        <button onClick={() => setShow(!show)}>Thu gọn</button>
      </div>
    </div>
  );
}
