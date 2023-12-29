"use client";
import { data } from "autoprefixer";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const postApi = `https://jsonplaceholder.typicode.com/todos`;

export default function PostList() {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR(postApi, fetcher, { refreshWhenOffline: true });
  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>error</h3>;

  return (
    <div>
      {posts?.map(({ id, title }) => (
        <h3 key={id}>{title}</h3>
      ))}
    </div>
  );
}
