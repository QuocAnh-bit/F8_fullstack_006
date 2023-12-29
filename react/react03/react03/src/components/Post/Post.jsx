import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function Post({ onSetCount }) {
  const [comments, setComment] = useState([]);
  const handleAddComment = (comment) => {
    setComment([...comments, comment]);
  };
  useEffect(() => {
    onSetCount(comments.length);
  }, [comments]);
  return (
    <div className="container py-3">
      <h2>Thông tin bài viết</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, dolore
        maiores vitae ducimus fuga tempore accusamus dolor autem placeat,
        consequatur explicabo eligendi sequi dignissimos eius iste quasi
        perspiciatis incidunt eaque.
      </p>
      <CommentList comment={comments} />
      <CommentForm onComment={handleAddComment} />
    </div>
  );
}
