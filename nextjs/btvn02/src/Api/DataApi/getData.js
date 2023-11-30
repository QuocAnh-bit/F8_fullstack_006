import config from "../config/config.json";
const { SERVER_API } = config;

export const getPosts = async () => {
  const response = await fetch(`${SERVER_API}/pages`);
  const data = await response.json();
  return data;
};

export const getPostDetail = async (id) => {
  const response = await fetch(`${SERVER_API}/pages/${id}`);
  const data = await response.json();
  return data;
};
