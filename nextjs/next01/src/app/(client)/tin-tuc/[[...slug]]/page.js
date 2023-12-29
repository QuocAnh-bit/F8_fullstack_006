import React from "react";

export default function PostsDetail({ params }) {
  const slug = params.slug;
  if (!slug) {
    return <h1>Danh Sách bài viết</h1>;
  }
  return (
    <div>
      <h1>Chuyên mục: {slug[0]}</h1>
      <h1>Chuyên mục: {slug[1]}</h1>
    </div>
  );
}
