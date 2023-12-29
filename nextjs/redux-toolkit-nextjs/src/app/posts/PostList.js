"use client";
import { postApi } from "@/redux/services/postApi";

export default function PostList() {
  const { data: posts, isLoading, isError } = postApi.useGetPostsQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Err</h1>;
  }
  return (
    <div>
      <ul>
        {posts?.map(({ title, id }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
}
