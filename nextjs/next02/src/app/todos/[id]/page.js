import PostDetail from "./PostDetail";

const getDetail = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return response.json();
};
const Detail = async ({ params }) => {
  const { id } = params;
  const details = await getDetail(id);
  return <PostDetail {...details} />;
};
export default Detail;
